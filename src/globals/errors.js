import { Toast } from 'quasar'

const apiErrorNames = {
  generalError: 'GeneralError',
  badRequest: 'BadRequest',
  NotAuthenticated: 'NotAuthenticated',
  invalidLogin: 'InvalidLogin'
}

const apiErrorObjects = {
  INVALID_TOKEN: {
    name: apiErrorNames.NotAuthenticated,
    message: 'invalid token'
  },

  INVALID_LOGIN: {
    name: apiErrorNames.NotAuthenticated,
    message: 'Invalid login.'
  }
}

const cleanMessages = {
  INVALID_TOKEN: 'Invalid token. Please login again.',
  INVALID_LOGIN: 'Incorrect username/password combination. Please try again.',
  UNKNOWN: 'An uknown error occurred.'
}

function isError (a, b) {
  return a.name === b.name &&
    a.message === b.message
}

export const cleanErrors = {
  EMPTY: { name: '', message: '' },
  INVALID_TOKEN: { message: cleanMessages.INVALID_TOKEN },
  INVALID_LOGIN: { message: cleanMessages.INVALID_LOGIN }
}

export function parseError (e) {
  const data = e.response.data || cleanErrors.EMPTY

  // invalid token error
  if (isError(data, apiErrorObjects.INVALID_TOKEN)) {
    Toast.create.info(cleanMessages.INVALID_TOKEN)
    return cleanErrors.INVALID_TOKEN
  }

  // invalid login credentials
  if (isError(data, apiErrorObjects.INVALID_LOGIN)) {
    return cleanErrors.INVALID_LOGIN
  }

  return { message: `${cleanMessages.UNKNOWN} (${data.message})` }
}
