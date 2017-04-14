import axios from 'axios'

import { apiUrls } from '../../globals/urls'
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

      commit(PLATFORMS.AJAX_BEGIN)
      axios({
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Authorization': authToken
        },
        url: apiUrls.platforms
      })
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
        resolve(state.platforms)
      } else {
        return dispatch('fetchPlatforms')
      }
    })
  },

  /** Simply clears the local list of Platforms; should be called when logging out */
  clearLocalPlatforms ({ commit }) {
    commit(PLATFORMS.CLEAR_ALL)
  }
}
