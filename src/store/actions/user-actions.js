import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import { parseError, cleanErrors } from '../../globals/errors'
import { PROFILE, USER } from '../mutation-types'

export default {
  /**
   * Attempts to login the user with the provided details.
   *
   * Note that, upon successful login, an extra API call is made to fetch
   * the full user data.
   *
   * @param credentials - An object with 'email' and 'password' props
   * @returns {Promise}
   */
  login ({ dispatch, commit }, credentials) {
    return new Promise((resolve, reject) => {
      commit(USER.AJAX_BEGIN)
      axios({
        method: 'post',
        headers: {
          'Accept': 'application/json'
        },
        url: apiUrls.login,
        data: credentials
      })
      .then(res => {
        // if no error, login locally with returned user data
        const userData = res.data.data
        const profile = res.data.data.profile
        const authToken = res.data.token

        if (userData.id && profile.id && authToken) {
          commit(USER.LOGIN, Object.assign({}, userData, { authToken }))
          commit(PROFILE.FETCH_SUCCESS, profile)
          commit(USER.AJAX_END)
          resolve()
        } else {
          commit(USER.AJAX_END)
          reject(cleanErrors.INVALID_LOGIN)
        }
      })
      .catch(err => {
        commit(USER.AJAX_END)
        reject(parseError(err))
      })
    })
  },

  /**
   * Attempts to log out the current user. A request will be sent to the API
   * to logout, but the local data will be cleared and the Promise will resolve
   * no matter what response the API sends.
   */
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(USER.LOGOUT)
      commit(PROFILE.LOGOUT)
      resolve()
    })
  },

  /**
   * Attempts to create a new user with the supplied data. If a new user
   * is successfully created, the user is automatically logged in.
   */
  createUser ({ dispatch, commit }, userData) {
    return new Promise((resolve, reject) => {
      commit(USER.AJAX_BEGIN)
      axios({
        method: 'post',
        headers: {
          'Accept': 'application/json'
        },
        url: apiUrls.user,
        data: userData
      })
      .then(res => {
        // if successful, immediately submit a login request
        dispatch('login', userData)
          .then(() => {
            resolve()
          }, err => {
            reject(err)
          })
      })
      .catch(err => {
        // if error, reject with error message
        commit(USER.AJAX_END)
        reject(parseError(err))
      })
    })
  },

  /**
   * Attempts to fetch user data from the API with the supplied auth token.
   * If the attempt is successful, the returned data is committed to localStorage.
   */
  loadUserDataFromToken ({ dispatch, commit }, authToken) {
    // GET request to User API endpoint
    function userReq () {
      return axios({
        method: 'get',
        headers: {
          'Authorization': authToken
        },
        url: apiUrls.user
      })
    }

    // GET request to Profile API endpoint
    function profileReq () {
      return axios({
        method: 'get',
        headers: {
          'Authorization': authToken
        },
        url: apiUrls.profiles
      })
    }

    commit(USER.AJAX_BEGIN)
    commit(PROFILE.AJAX_BEGIN)

    return new Promise((resolve, reject) => {
      axios.all([userReq(), profileReq()])
        .then(res => {
          const userData = res[0].data.data[0]
          const profile = res[1].data.data[0]

          if (userData.id && profile.id) {
            commit(USER.LOGIN, Object.assign({}, userData, { authToken }))
            commit(PROFILE.FETCH_SUCCESS, profile)
            commit(USER.AJAX_END)
            commit(PROFILE.AJAX_END)
            resolve()
          } else {
            commit(USER.AJAX_END)
            commit(PROFILE.AJAX_END)
            return dispatch('logout')
          }
        })
        .catch(err => {
          // if error, reject with error message
          dispatch('logout')
          commit(USER.AJAX_END)
          commit(PROFILE.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Attempts to "re-login" from credentials stored in localStorage. Should be
   * called first upon re-loading the app.
   */
  checkForStoredLogin ({ getters, dispatch, commit }) {
    return new Promise((resolve, reject) => {
      let storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        if (getters.userData.id) {
          resolve(getters.userData)
        } else {
          dispatch('loadUserDataFromToken', storedToken)
            .then(res => {
              resolve(res)
            }, err => {
              reject(err)
            })
        }
      } else {
        reject(cleanErrors.EMPTY)
      }
    })
  }
}
