import env from '../../globals/env'
import { GAMES } from '../mutation-types'

import actions from '../actions/games-actions'
import mockActions from '../mock/games/games-actions-mock'

export default {
  state: {
    gamesAjaxPending: false,
    games: []
  },

  getters: {
    gamesAjaxPending (state) {
      return state.gamesAjaxPending
    },

    /** Returns the list of Games sorted alphabetically */
    games (state) {
      return state.games.sort((a, b) => {
        return a.title > b.title ? 1 : -1
      })
    }
  },

  mutations: {
    [GAMES.CLEAR_ALL] (state, games) {
      state.games = []
    },

    /* =============================================
     = Games fetching
     ============================================= */
    [GAMES.AJAX_BEGIN] (state) {
      state.gamesAjaxPending = true
    },

    [GAMES.AJAX_END] (state) {
      state.gamesAjaxPending = false
    },

    [GAMES.FETCH_SUCCESS] (state, games) {
      state.games = games
      state.games.sort()
    },

    /* =============================================
     = Games creating/editing
     ============================================= */
    [GAMES.CREATE_SUCCESS] (state, payload) {
      state.games.push(payload)
    },

    [GAMES.UPDATE_SUCCESS] (state, game) {
      state.games = [...state.games.filter(
        s => Number(s.id) !== Number(game.id)
      ), game]
    },

    [GAMES.DELETE_SUCCESS] (state, gameId) {
      state.games = state.games.filter(
        g => Number(g.id) !== Number(gameId)
      )
      state.games.sort()
    }
  },

  actions: env.useMockApi() ? mockActions : actions
}
