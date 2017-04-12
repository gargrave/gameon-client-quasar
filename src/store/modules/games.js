// import env from '../../globals/env'
import { GAMES } from '../mutation-types'
import gamesSorter, { DEFAULT_SORT } from '../utils/game-sorter'

import actions from '../actions/games-actions'
// import mockActions from '../mock/games-actions-mock'

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

    /* ============================================
     = Games fetching
     ============================================= */
    [GAMES.AJAX_BEGIN] (state) {
      state.gamesAjaxPending = true
    },

    [GAMES.AJAX_END] (state) {
      state.gamesAjaxPending = false
    },

    [GAMES.FETCH_ALL] (state, games) {
      state.games = gamesSorter.sort(games, DEFAULT_SORT, false)
    },

    /* =============================================
     = Games creating/editing
     ============================================= */
    [GAMES.CREATE] (state, game) {
      state.games.push(game)
      state.games = gamesSorter.sort(state.games, DEFAULT_SORT, false)
    },

    [GAMES.UPDATE] (state, game) {
      state.games = [...state.games.filter(
        s => s.id !== game.id
      ), game]
      state.games = gamesSorter.sort(state.games, DEFAULT_SORT, false)
    },

    [GAMES.DELETE] (state, gameId) {
      state.games = state.games.filter(
        s => s.id !== gameId
      )
      state.games = gamesSorter.sort(state.games, DEFAULT_SORT, false)
    }
  },

  actions: actions
  // actions: env.useMockApi() ? mockActions : actions
}
