import { cloneDeep } from 'lodash'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
import PlatformModel from '../../../models/platform'

export function validate (data) {
  let valid = true
  let testData = cloneDeep(data)
  let errors = PlatformModel.emptyValidationErrors()

  // validate title -> required
  if (validator.isEmpty(testData.title)) {
    errors.title = valErrs.required
    valid = false
  }

  return { valid, errors }
}

export function areEqual (a, b) {
  if (!a || !b) {
    return false
  }
  let match = true

  // compare 'id' prop
  if ((a.id && b.id) && (Number(a.id) !== Number(b.id))) {
    match = false
  }

  // compare 'title' prop
  if ((a.title.trim() !== b.title.trim())) {
    match = false
  }

  return match
}
