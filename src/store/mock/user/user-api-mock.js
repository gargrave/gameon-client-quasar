import env from '../../../globals/env'
import { verboseLog } from '../../../globals/utils'

import { types, getMockError } from '../mock-errors'
import mockData from './user-data-mock'

let mockUser = mockData.user
let mockPassword = mockData.password

verboseLog('INFO: Mock User API Enabled')

export default {
  /**
   * Mock implement of API's login method
   * If credentials match the mock user, authenticate as expected and resolve with the token.
   * Otherwise, reject.
   */
  login ({ email, password }) {
    verboseLog('LOG: Mock User API -> login()')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === mockUser.email && password === mockPassword) {
          resolve({
            data: {
              data: {
                id: mockUser.id,
                email: mockUser.email,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.createdAt
              },
              token: mockData.authToken
            }
          })
        } else {
          reject(getMockError(types.INVALID_LOGIN))
        }
      }, env.mockApiDelay)
    })
  },

  /** Mock implement of API's logout method; nothing needed here beyond the Promise resolution. */
  logout () {
    verboseLog('Mock User API -> logout()')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, env.mockApiDelay)
    })
  },

  /**
   * Mock implement of API's 'fetch Profile' method. Simply return the mock user profile. */
  profile () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          body: mockData.profile
        })
      }, env.mockApiDelay / 2)
    })
  }
}
