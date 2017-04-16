import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import { apiHelper } from '../../globals/utils'
import { cleanErrors, parseError } from '../../globals/errors'
import { PLATFORMS } from '../mutation-types'

export default {
  /**
   * Fetches the full list of user's Platforms from the API.
   */
  fetchPlatforms ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      // make sure we have a valid auth token
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(apiUrls.platforms, authToken)
      commit(PLATFORMS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const platforms = res.data.data
          commit(PLATFORMS.FETCH_SUCCESS, platforms)
          commit(PLATFORMS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(PLATFORMS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Returns the list of user's Platforms. If the Platforms have already loaded,
   * this cached version will be returned. Otherwise, a chained call will be
   * made to the API.
   *
   * This is useful for operations that need to make sure the Platforms have been
   * loaded before proceeding (e.g. 'find by ID').
   */
  getCachedOrFetchPlatforms ({ state, dispatch, commit }) {
    return new Promise((resolve, reject) => {
      if (state.platforms.length) {
        resolve()
      } else {
        dispatch('fetchPlatforms')
          .then(() => {
            resolve()
          }, err => {
            reject(err)
          })
      }
    })
  },

  /**
   * Reqeusts an individual Platform with the specified ID from the API.
   */
  fetchPlatformById ({ getters, commit }, id) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(`${apiUrls.platforms}${id}`, authToken)
      commit(PLATFORMS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          commit(PLATFORMS.AJAX_END)
          resolve(res.data)
        })
        .catch(err => {
          commit(PLATFORMS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Finds and returns an individual Platform based on the specified ID.
   * Note that if the Platform cannot be found in the local list, a call to
   * the API will be made requesting the single Platform instance.
   */
  findPlatform ({ state, dispatch, commit }, platformId) {
    return new Promise((resolve, reject) => {
      dispatch('getCachedOrFetchPlatforms')
        .then(() => {
          // check for a copy of this Platform in our local data
          let platform = apiHelper.findRecordById(state.platforms, platformId)
          if (platform) {
            resolve(platform)
          } else {
            // if the Platform is not stored locally, make a call to the API
            dispatch('fetchPlatformById', platformId)
              .then(platformRes => {
                resolve(platformRes)
              }, err => {
                reject(parseError(err))
              })
          }
        }, err => {
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to create a new Platform instance.
   */
  createPlatform ({ getters, commit }, platform) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axPost(apiUrls.platforms, platform, authToken)
      commit(PLATFORMS.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const platform = res.data
          commit(PLATFORMS.CREATE_SUCCESS, platform)
          commit(PLATFORMS.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(PLATFORMS.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /** Simply clears the local list of Platforms; should be called when logging out */
  clearLocalPlatforms ({ commit }) {
    commit(PLATFORMS.CLEAR_ALL)
  }
}
