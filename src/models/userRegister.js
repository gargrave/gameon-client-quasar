export default {
  empty () {
    return {
      username: '',
      email: '',
      password1: '',
      password2: ''
    }
  },

  toAPI (data) {
    let payload = {
      username: data.username || '',
      email: data.email || '',
      password1: data.password1 || '',
      password2: data.password2 || ''
    }

    if (data.id) {
      payload.id = data.id
    }

    return payload
  },

  emptyValidationErrors () {
    return {
      username: '',
      email: '',
      password1: '',
      password2: ''
    }
  }
}
