export const apiErrors = {
  generalError: 'GeneralError',
  badRequest: 'BadRequest',
  notAuthenticated: 'NotAuthenticated',
  invalidLogin: 'InvalidLogin'
}

export const errMsg = {
  [apiErrors.invalidLogin]: 'Invalid login credentials. Please try again.',
  validation: 'Submitted data did not validate. Please double-check and fix any errors.',
  unknown: 'An uknown error occurred.'
}
