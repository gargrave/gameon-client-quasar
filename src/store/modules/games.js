import env from '../../globals/env'
import { GAMES } from '../mutation-types'

import GameModel from '../../models/game'
import actions from '../actions/games-actions'
import mockActions from '../mock/games/games-actions-mock'

function sortGames (games) {
  games.sort((a, b) => {
    if (!b.lastPlayed) {
      return -1
    }
    return (a.lastPlayed > b.lastPlayed) ? -1 : 1
  })
}

export default {
  state: {
    gamesAjaxPending: false,
    games: []
  },

  getters: {
    gamesAjaxPending (state) {
      return state.gamesAjaxPending
    },

    games (state) {
      return state.games
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
      state.games = []
      for (let game of games) {
        state.games.push(GameModel.fromAPI(game))
      }
      sortGames(state.games)
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
      sortGames(state.games)
    }
  },

  actions: env.useMockApi() ? mockActions : actions
}
