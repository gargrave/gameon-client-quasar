import env from '../../globals/env'
import { PLATFORMS } from '../mutation-types'

import actions from '../actions/platforms-actions'
import mockActions from '../mock/platforms/platforms-actions-mock'

export default {
  state: {
    platformsAjaxPending: false,
    platforms: []
  },

  getters: {
    platformsAjaxPending (state) {
      return state.platformsAjaxPending
    },

    /** Returns the list of Platforms sorted alphabetically */
    platforms (state) {
      return state.platforms.sort((a, b) => {
        return a.title > b.title ? 1 : -1
      })
    }
  },

  mutations: {
    [PLATFORMS.CLEAR_ALL] (state, platforms) {
      state.platforms = []
    },

    /* =============================================
     = Platforms fetching
     ============================================= */
    [PLATFORMS.AJAX_BEGIN] (state) {
      state.platformsAjaxPending = true
    },

    [PLATFORMS.AJAX_END] (state) {
      state.platformsAjaxPending = false
    },

    [PLATFORMS.FETCH_SUCCESS] (state, platforms) {
      state.platforms = platforms
      state.platforms.sort()
    },

    /* =============================================
     = Platforms creating/editing
     ============================================= */
    [PLATFORMS.CREATE_SUCCESS] (state, payload) {
      state.platforms.push(payload)
    },

    [PLATFORMS.UPDATE_SUCCESS] (state, platform) {
      state.platforms = [...state.platforms.filter(
        s => Number(s.id) !== Number(platform.id)
      ), platform]
    },

    [PLATFORMS.DELETE_SUCCESS] (state, platformId) {
      state.platforms = state.platforms.filter(
        p => Number(p.id) !== Number(platformId)
      )
      state.platforms.sort()
    }
  },

  actions: env.useMockApi() ? mockActions : actions
}
