import mockApi from './user-api-mock'
import { apiErrors, errMsg } from '../../../globals/errors'
import { USER } from '../../mutation-types'

export default {
  /** Mock implementation of login method; authenticates the user and stores the data locally. */
  login ({ dispatch, commit }, credentials) {
    return new Promise((resolve, reject) => {
      commit(USER.AJAX_BEGIN)

      mockApi.login(credentials)
        .then((res) => {
          // if no error, login locally with returned user data
          const userData = res.data.data
          const authToken = res.data.token

          if (authToken) {
            dispatch('loadUserDataFromToken', authToken)
              .then((res) => {
                userData.authToken = authToken
                commit(USER.LOGIN, userData)
                commit(USER.AJAX_END)
                resolve()
              }, (err) => {
                commit(USER.AJAX_END)
                reject(err)
              })
          }
        }, err => {
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

  /** Mock implementation of logout method; clears user data. */
  logout ({ getters, dispatch, commit }) {
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

  createUser ({ dispatch, commit }, userData) {
    return new Promise((resolve, reject) => {
      reject('TODO: Not implemented')
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
