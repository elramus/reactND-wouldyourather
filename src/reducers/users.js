import C from '../utils/constants'

const users = (state = {}, action) => {
  switch (action.type) {
    case C.RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case C.ANSWER_QUESTION:
      const { userId, questionId, option } = action
      return {
        ...state,
        [userId]: {
          ...state[userId],
          answers: {
            ...state[userId].answers,
            [questionId]: option
          }
        }
      }
    case C.ADD_QUESTION_TO_USER:
    const { uId, qId } = action
      return {
        ...state,
        [uId]: {
          ...state[uId],
          questions: [ ...state[uId].questions, qId ]
        }
      }
    default:
      return state
  }
}
export default users