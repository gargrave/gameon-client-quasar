export default {
  buildProfile (data = {}) {
    return {
      id: data.id || '',
      firstName: data.firstName || '',
      lastName: data.lastName || ''
    }
  }
}
