import C from '../utils/constants'

export function receiveUsers(users) {
  return {
    type: C.RECEIVE_USERS,
    users
  }
}

// export function addAnswerToUser(uId, qId, option) {
//   return {
//     type: C.ADD_ANSWER_TO_USER,
//     uId, qId, option
//   }
// }

export function addQuestionToUser(uId, qId) {
  return {
    type: C.ADD_QUESTION_TO_USER,
    uId, qId
  }
}