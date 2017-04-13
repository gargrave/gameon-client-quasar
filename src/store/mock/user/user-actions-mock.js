import mockApi from './user-api-mock'
import { parseError } from '../../../globals/errors'
import { USER } from '../../mutation-types'

export default {
  /** Mock implementation of login method; authenticates the user and stores the data locally. */
  login ({ dispatch, commit }, credentials) {
    return new Promise((resolve, reject) => {
      commit(USER.AJAX_BEGIN)

      mockApi.login(credentials)
        .then(res => {
          // if no error, login locally with returned user data
          const userData = res.data.data
          const authToken = res.data.token

          if (authToken) {
            dispatch('loadUserDataFromToken', authToken)
              .then(res => {
                userData.authToken = authToken
                commit(USER.LOGIN, userData)
                commit(USER.AJAX_END)
                resolve()
              }, err => {
                commit(USER.AJAX_END)
                reject(err)
              })
          }
        }, err => {
          // if error, reject with error message
          commit(USER.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Mock implementation of logout method; clears user data.
   */
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(USER.AJAX_BEGIN)

      mockApi.logout()
        .then(() => {
          commit(USER.LOGOUT)
          commit(USER.AJAX_END)
          resolve()
        })
    })
  },

  /**
   * Mock implementation of createUser method; creates a new user object on the mock API.
   */
  createUser ({ dispatch, commit }, userData) {
    return new Promise((resolve, reject) => {
      commit(USER.AJAX_BEGIN)

      mockApi.createUser(userData)
        .then(res => {
          // if successful, immediately submit a login request
          dispatch('login', userData)
            .then(() => {
              resolve()
            }, err => {
              reject(err)
            })
        }, err => {
          reject(err)
        })
    })
  },

  loadUserDataFromToken ({ getters, dispatch, commit }, authToken) {
    return new Promise((resolve, reject) => {
      console.log('TODO: Need to implement loading mock User Profile')
      resolve()
    })
  },

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
