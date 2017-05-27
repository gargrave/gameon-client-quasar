import { cloneDeep, isEqual } from 'lodash'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
import GameModel, { parsePlatform } from '../../../models/game'

export function validate (data) {
  let valid = true
  let testData = cloneDeep(data)
  let errors = GameModel.emptyValidationErrors()

  // validate title -> required
  if (validator.isEmpty(testData.title)) {
    errors.title = valErrs.required
    valid = false
  }

  // validate platform -> required
  if (!testData.platform) {
    errors.platform = valErrs.required
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

  // compare 'finished' prop
  if ((a.finished !== b.finished)) {
    match = false
  }

  // compare 'platform' prop
  // need to make sure we are only comparing platform ids,
  // and not the full platform object
  const platformA = parsePlatform(a)
  const platformB = parsePlatform(b)
  if (platformA !== platformB) {
    match = false
  }

  // compare dates: all of existing, added, and removed
  // many objects will not have any props for these, hence the empty array defaults
  if (!isEqual(a.dates || [], b.dates || [])) {
    match = false
  } else if (!isEqual(a.datesAdded || [], b.datesAdded || [])) {
    match = false
  } else if (!isEqual(a.datesRemoved || [], b.datesRemoved || [])) {
    match = false
  }

  return match
}
