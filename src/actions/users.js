import C from '../utils/constants'

export function receiveUsers(users) {
  return {
    type: C.RECEIVE_USERS,
    users
  }
}