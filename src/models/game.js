import { cloneDeep } from 'lodash'

export function parsePlatform (game) {
  if (game.platform) {
    if (Number.isInteger(game.platform)) {
      return game.platform
    } else if (game.platform.id) {
      return game.platform.id
    }
  }
  throw new TypeError('Game does not have valid Platform data.')
}

export default {
  empty () {
    return {
      title: '',
      platform: undefined,
      finished: false,
      dates: [],
      datesAdded: [],
      datesRemoved: []
    }
  },

  toAPI (data) {
    let payload = {
      title: data.title || '',
      platform: parsePlatform(data),
      finished: data.finished || false,
      dates: data.dates || []
    }

    if (data.id) {
      payload.id = data.id
    }

    if (data.datesRemoved) {
      payload.datesRemoved = data.datesRemoved
    }

    return payload
  },

  fromAPI (data) {
    let updated = {
      lastPlayed: data.dates[0] || null
    }

    return Object.assign({},
      this.empty(),
      cloneDeep(data),
      updated
    )
  },

  emptyValidationErrors () {
    return {
      title: '',
      platform: '',
      finished: '',
      dates: ''
    }
  }
}
