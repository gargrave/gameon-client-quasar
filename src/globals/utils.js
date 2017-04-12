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
  }
}
