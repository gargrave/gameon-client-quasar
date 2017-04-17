import { isEqual } from 'lodash'

import platformData from './platform-data'

export default {
  buildGame (data = {}) {
    return {
      id: data.id || '',
      title: data.title || '',
      platform: platformData.buildPlatform(data.platform || {}),
      dates: data.dates || [],
      finished: data.finished || false
    }
  },

  /**
   * Builds the necessary data for a request to the server to create a new instance.
   */
  buildDataForCreate (data) {
    return {
      title: data.title ? data.title.trim() : ''
    }
  },

  /**
   * Builds the necessary data for a request to the server to updated an existing instance.
   */
  buildDataForUpdate (original, updated) {
    return Object.assign({ id: original.id }, this.buildDataForCreate(updated))
  },

  /**
   * Returns whether two Game objects have identical datasets.
   */
  areIndentical (a, b) {
    let matching = true

    // compare game titles
    if (a.title.trim() !== b.title.trim()) {
      matching = false
    }

    // compare platforms
    if (a.platformId !== b.platformId) {
      matching = false
    }

    // compate game dates collections
    a.dates.sort()
    b.dates.sort()
    if (!isEqual(a.dates, b.dates)) {
      matching = false
    }

    // compare 'finished' state
    if (!isEqual(a.finished, b.finished)) {
      matching = false
    }

    return matching
  }
}
