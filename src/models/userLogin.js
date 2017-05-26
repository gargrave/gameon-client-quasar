export default {
  empty () {
    return {
      username: '',
      password: ''
    }
  },

  toAPI (data) {
    let payload = {
      username: data.username || '',
      password: data.password || ''
    }

    if (data.id) {
      payload.id = data.id
    }

    return payload
  },

  emptyValidationErrors () {
    return {
      username: '',
      password: ''
    }
  }
}
