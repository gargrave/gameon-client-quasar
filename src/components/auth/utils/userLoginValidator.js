import { cloneDeep } from 'lodash'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
import UserLoginModel from '../../../models/userLogin'

export function validate (data) {
  let valid = true
  let errors = UserLoginModel.emptyValidationErrors()
  let testData = cloneDeep(data)

  // validate username -> required
  if (validator.isEmpty(testData.username)) {
    errors.username = valErrs.required
    valid = false
  }

  // validate password -> min length 8
  if (!validator.isLength(testData.password, { min: 8 })) {
    errors.password = valErrs.length(8)
    valid = false
  }

  return { errors, valid }
}
