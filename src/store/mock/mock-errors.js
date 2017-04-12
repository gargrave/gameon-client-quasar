/**
Constant type strings for mock errors. Simply a convenience/safety mechanism.
*/
export const types = {
  INVALID_LOGIN: 'INVALID_LOGIN'
}

/**
 * Returns a mock error object with the same structure as the API.
 * @param {*} err The type of error to build; use the 'types' map for safety.
 */
export const getMockError = err => ({ response: { data: mockErrors[types[err]] } })

/*
Error message objects. These are built to be identical to the error messages
return from the real API.
*/
const mockErrors = {
  [types.INVALID_LOGIN]: {
    name: 'NotAuthenticated',
    message: 'Invalid login.',
    code: 401,
    className: 'not-authenticated',
    errors: {}
  }
}
