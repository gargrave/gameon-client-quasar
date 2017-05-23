import { cloneDeep } from 'lodash'

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
      platform: data.platform,
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
      platform: data.platform.id
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
