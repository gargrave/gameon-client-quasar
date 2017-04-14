import { PLATFORMS } from '../../mutation-types'
import mockData from './platforms-data-mock'

export default {
  initPlatforms ({ getters, dispatch }) {
    if (getters.platforms.length) {
      return new Promise((resolve, reject) => {
        resolve(getters.platforms)
      })
    } else {
      return dispatch('fetchPlatforms')
    }
  },

  fetchPlatforms ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      commit(PLATFORMS.AJAX_BEGIN)
      const platforms = mockData.platforms
      commit(PLATFORMS.FETCH_SUCCESS, platforms)
      commit(PLATFORMS.AJAX_END)
      resolve(platforms)
    })
  },

  addPlatformToGame ({ getters, dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // a 'platformTitle' prop shows that we are creating Platform, rather than using existing
      const creatingNewplatform = payload.platformTitle !== undefined

      const platform = creatingNewplatform ? {
        id: mockData.platforms[mockData.platforms.length - 1].id + 1,
        title: payload.platformTitle
      } : mockData.platforms.find((t) => {
        return t.id === payload.platformId
      })

      const platformData = {
        gameId: payload.gameId,
        platform: {
          id: 0,
          _platform: platform
        }
      }

      commit(PLATFORMS.AJAX_BEGIN)
      if (creatingNewplatform) {
        commit(PLATFORMS.CREATE_SUCCESS, platformData)
      }
      dispatch('addPlatformToLocalGame', platformData)
      commit(PLATFORMS.AJAX_END)
      resolve(platformData)
    })
  },

  removePlatformFromGame ({ getters, dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(PLATFORMS.AJAX_BEGIN)
      dispatch('removePlatformFromLocalGame', payload)
      commit(PLATFORMS.AJAX_END)
      resolve(payload)
    })
  },

  deletePlatform ({ getters, commit }, platformId) {
    return new Promise((resolve, reject) => {
      commit(PLATFORMS.AJAX_BEGIN)
      commit(PLATFORMS.DELETE_SUCCESS, platformId)
      commit(PLATFORMS.AJAX_END)
      resolve(platformId)
    })
  }
}
