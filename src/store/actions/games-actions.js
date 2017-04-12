// import axios from 'axios'

// import { apiUrls } from '../../app-data/urls'
import { GAMES } from '../mutation-types'

export default {
  /**
   * Fetches the full list of user's Games from the API.
   */
  fetchGames ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      reject('Not implemented')
    })
  },

  /**
   * Returns the list of user's Games. If the Games have already loaded,
   * this cached version will be returned. Otherwise, a chained call will be
   * made to the API.
   *
   * This is useful for operations that need to make sure the Games have been
   * loaded before proceeding (e.g. 'find by ID').
   */
  getCachedOrFetchGames ({ state, dispatch, commit }) {
    return new Promise((resolve, reject) => {
      if (state.games.length) {
        resolve(state.games)
      } else {
        dispatch('fetchGames')
          .then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
      }
    })
  },

  /** Simply clears the local list of Games; should be called when logging out */
  clearLocalGames ({ commit }) {
    commit(GAMES.CLEAR_ALL)
  }
}
