export default {
  buildPlatform (data = {}) {
    return {
      id: data.id || '',
      title: data.title || '',
      lastName: data.lastName || ''
    }
  }
}
