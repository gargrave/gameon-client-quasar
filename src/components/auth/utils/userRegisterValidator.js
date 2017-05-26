import { cloneDeep } from 'lodash'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
import UserRegisterModel from '../../../models/userRegister'

export function validate (data) {
  let valid = true
  let errors = UserRegisterModel.emptyValidationErrors()
  let testData = cloneDeep(data)

  // validate username -> required
  if (validator.isEmpty(testData.username)) {
    errors.username = valErrs.required
    valid = false
  }

  // validate username -> required
  if (!validator.isEmail(testData.email)) {
    errors.email = valErrs.email
    valid = false
  }

  // validate password1 -> min length 8
  if (!validator.isLength(testData.password1, { min: 8 })) {
    errors.password1 = valErrs.length(8)
    valid = false
  }

  // validate password2 -> min length 8
  if (!validator.isLength(testData.password2, { min: 8 })) {
    errors.password2 = valErrs.length(8)
    valid = false
  }

  // validate password2 -> must match password1
  if (testData.password1 !== testData.password2) {
    errors.password2 = valErrs.passwords
    valid = false
  }

  return { errors, valid }
}
