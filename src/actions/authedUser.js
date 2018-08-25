import C from '../utils/constants'

export function authUser(userId) {
  return {
    type: C.AUTH_USER,
    userId
  }
}