/*
A set of pre-defined Toast objects for use with Quasar.
Simply a convenience to avoid writing the same Toast data over and over.
*/
import { Toast } from 'quasar'

export default {
  noChanges () {
    Toast.create.warning('Nothing to save! No data has been changed.')
  },

  deleteConfirm (name = 'Entry') {
    Toast.create.positive(`${name} deleted!`)
  }
}
