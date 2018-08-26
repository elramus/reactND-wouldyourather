import C from '../utils/constants'

const questions = (state = {}, action) => {
  switch (action.type) {
    case C.RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case C.ANSWER_QUESTION:
      const { questionId, userId, option} = action
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [option]: {
            ...state[questionId][option],
            votes: [ ...state[questionId][option].votes, userId]
          }
        }
      }
    default:
      return state
  }
}
export default questions