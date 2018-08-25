import C from '../utils/constants'

const questions = (state = {}, action) => {
  switch (action.type) {
    case C.RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    default:
      return state
  }
}
export default questions