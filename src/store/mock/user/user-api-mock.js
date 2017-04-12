import env from '../../../globals/env'
import { verboseLog } from '../../../globals/utils'

import { types, getMockError } from '../mock-errors'
import mockData from './user-data-mock'

export default {
  /**
   * Mock implement of API's login method
   * If credentials match a mock user, authenticate as expected and resolve with the token.
   * Otherwise, reject.
   */
  login ({ email, password }) {
    verboseLog('LOG: Mock User API -> login()')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = mockData.users
        const user = users.find(u => {
          return u.email === email && u.password === password
        })

        if (user) {
          resolve({
            data: {
              data: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.createdAt
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

  createUser (userData) {
    return new Promise((resolve, reject) => {
      reject('TODO: Not implemented')
    })
  }
}
