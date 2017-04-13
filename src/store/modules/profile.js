import env from '../../globals/env'

import { PROFILE } from '../mutation-types'

import actions from '../actions/profile-actions'
import mockActions from '../mock/profile/profile-actions-mock'

function buildProfile (data = {}) {
  return {
    id: data.id || '',
    firstName: data.firstName || '',
    lastName: data.lastName || ''
  }
}

export default {
  state: {
    // whether we have any open calls to the Profile API
    profileAjaxPending: false,

    // full profile data
    profile: buildProfile()
  },

  getters: {
    profileAjaxPending (state) {
      return state.profileAjaxPending
    },

    /** Returns full profile data for currently logged in profile */
    profile (state) {
      return state.profile
    }
  },

  mutations: {
    /* =============================================
     = Profile Mutations
     ============================================= */
    /** Staring AJAX call to the Profile API */
    [PROFILE.AJAX_BEGIN] (state) {
      state.profileAjaxPending = true
    },

    /** Finishing AJAX call to the Profile API */
    [PROFILE.AJAX_END] (state) {
      state.profileAjaxPending = false
    },

    /** login authenticated profile; save provided profile details in the store */
    [PROFILE.FETCH_SUCCESS] (state, profile) {
      state.profile = buildProfile(profile)
    },

    /** logout current profile; simply clear existing profile data */
    [PROFILE.LOGOUT] (state) {
      state.profile = buildProfile()
    }
  },

  actions: env.useMockApi() ? mockActions : actions
}
