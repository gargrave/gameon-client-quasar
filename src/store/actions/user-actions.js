import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import { apiErrors, errMsg } from '../../globals/errors'
import { USER } from '../mutation-types'

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
        const authToken = res.data.token

        if (authToken) {
          dispatch('loadUserDataFromToken', authToken)
            .then(() => {
              userData.authToken = authToken
              commit(USER.LOGIN, userData)
              commit(USER.AJAX_END)
              resolve()
            }, err => {
              commit(USER.AJAX_END)
              reject(err)
            })
        } else {
          commit(USER.AJAX_END)
          reject(errMsg[apiErrors.invalidLogin])
        }
      })
      .catch(err => {
        // if error, reject with error message
        const errCode = err.response.data.name
        let errorMessage = errMsg.unknown

        if (errCode === apiErrors.notAuthenticated) {
          errorMessage = errMsg[apiErrors.invalidLogin]
        }

        commit(USER.AJAX_END)
        reject(errorMessage)
      })
    })
  },

  /**
   * Attempts to log out the current user. A request will be sent to the API
   * to logout, but the local data will be cleared and the Promise will resolve
   * no matter what response the API sends.
   */
  logout ({ getters, dispatch, commit }) {
    return new Promise((resolve, reject) => {
      reject('not implemented yet')
    })
  },

  /**
   * Attempts to create a new user with the supplied data. If a new user
   * is successfully created, the user is automatically logged in.
   */
  createUser ({ dispatch, commit }, userData) {
    return new Promise((resolve, reject) => {
      reject('not implemented yet')
    })
  },

  /**
   * Attempts to fetch user data from the API with the supplied auth token.
   * If the attempt is successful, the returned data is committed to localStorage.
   */
  loadUserDataFromToken ({ getters, dispatch, commit }, authToken) {
    return new Promise((resolve, reject) => {
      console.log('TODO: Need to implement loading user Profile')
      resolve()
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
        reject()
      }
    })
  }
}
