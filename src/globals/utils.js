export function verboseLog (data) {
  console.log('***********************************')
  console.log(`* ${data}`)
  console.log('***********************************')
}

export const apiHelper = {
  findRecordById (records, id) {
    let record = records.filter(record => record.id === id)
    if (record.length) {
      return record[0]
    }
    return null
  },

  /**
   * Builds a request for an AJAX call via axios.
   * Mostly just a shortcut to save writing everything out over and over
   */
  buildRequest (method, url, authToken = null) {
    let req = {
      method,
      headers: {
        'Accept': 'application/json'
      },
      url
    }

    if (authToken) {
      req.headers['Authorization'] = authToken
    }

    return req
  }
}
