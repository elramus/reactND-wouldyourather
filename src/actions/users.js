import C from '../utils/constants'
import { _getUsers } from '../utils/_DATA'

export function receiveUsers(users) {
  return {
    type: C.RECEIVE_USERS,
    users
  }
}

export function addQuestionToUser(uId, qId) {
  return {
    type: C.ADD_QUESTION_TO_USER,
    uId, qId
  }
}

export function fetchUsers() {
  return (dispatch) => {
    _getUsers()
      .then(res => {
        dispatch(receiveUsers(res))
      })
  }
}