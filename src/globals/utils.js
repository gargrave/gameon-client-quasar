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
   * Builds a GET request for an AJAX call via axios.
   * Mostly just a shortcut to save writing everything out over and over
   */
  axGet (url, authToken = null) {
    let req = {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      },
      url
    }

    if (authToken) {
      req.headers['Authorization'] = authToken
    }

    return req
  },

  /**
   * Builds a GET request for an AJAX call via axios.
   * Mostly just a shortcut to save writing everything out over and over
   */
  axPost (url, data, authToken = null) {
    let req = {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      },
      url,
      data
    }

    if (authToken) {
      req.headers['Authorization'] = authToken
    }

    return req
  }
}
