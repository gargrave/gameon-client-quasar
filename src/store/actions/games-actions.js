import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import { apiHelper } from '../../globals/utils'
import { cleanErrors, parseError } from '../../globals/errors'
import { GAMES } from '../mutation-types'

export default {
  /**
   * Fetches the full list of user's Games from the API.
   */
  fetchGames ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      // make sure we have a valid auth token
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(apiUrls.games, authToken)
      commit(GAMES.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const games = res.data.data
          commit(GAMES.FETCH_SUCCESS, games)
          commit(GAMES.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(GAMES.AJAX_END)
          reject(parseError(err))
        })
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
        resolve()
      } else {
        dispatch('fetchGames')
          .then(() => {
            resolve()
          }, err => {
            reject(err)
          })
      }
    })
  },

  /**
   * Reqeusts an individual Game with the specified ID from the API.
   */
  fetchGameById ({ getters, commit }, id) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axGet(`${apiUrls.games}${id}`, authToken)
      commit(GAMES.AJAX_BEGIN)

      axios(request)
        .then(res => {
          commit(GAMES.AJAX_END)
          resolve(res.data)
        })
        .catch(err => {
          commit(GAMES.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Finds and returns an individual Game based on the specified ID.
   * Note that if the Game cannot be found in the local list, a call to
   * the API will be made requesting the single Game instance.
   */
  findGame ({ state, dispatch, commit }, gameId) {
    return new Promise((resolve, reject) => {
      dispatch('getCachedOrFetchGames')
        .then(() => {
          // check for a copy of this Game in our local data
          let game = apiHelper.findRecordById(state.games, gameId)
          if (game) {
            resolve(game)
          } else {
            // if the Game is not stored locally, make a call to the API
            dispatch('fetchGameById', gameId)
              .then(gameRes => {
                resolve(gameRes)
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
   * Sends a request to the server to create a new Game instance.
   */
  createGame ({ getters, commit }, game) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axPost(apiUrls.games, game, authToken)
      commit(GAMES.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const game = res.data
          commit(GAMES.CREATE_SUCCESS, game)
          commit(GAMES.AJAX_END)
          resolve(game)
        })
        .catch(err => {
          commit(GAMES.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to update an existing Game instance.
   */
  updateGame ({ getters, commit }, game) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject(cleanErrors.INVALID_TOKEN)
      }

      const request = apiHelper.axPut(
        `${apiUrls.games}${game.id}`, game, authToken)
      commit(GAMES.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const game = res.data
          commit(GAMES.UPDATE_SUCCESS, game)
          commit(GAMES.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(GAMES.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /**
   * Sends a request to the server to delete an existing Game instance.
   */
  deleteGame ({ getters, commit }, gameId) {
    return new Promise((resolve, reject) => {
      const authToken = getters.authToken
      if (!authToken) {
        reject('Not authenticated')
      }

      const request = apiHelper.axDelete(
        `${apiUrls.games}${gameId}`, {}, authToken)
      commit(GAMES.AJAX_BEGIN)

      axios(request)
        .then(res => {
          const game = res.data
          commit(GAMES.DELETE_SUCCESS, game)
          commit(GAMES.AJAX_END)
          resolve()
        })
        .catch(err => {
          commit(GAMES.AJAX_END)
          reject(parseError(err))
        })
    })
  },

  /** Simply clears the local list of Games; should be called when logging out */
  clearLocalGames ({ commit }) {
    commit(GAMES.CLEAR_ALL)
  }
}
