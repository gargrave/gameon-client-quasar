export default {
  buildPlatform (data = {}) {
    return {
      id: data.id || '',
      title: data.title || ''
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

    return matching
  }
}
