import C from '../utils/constants'

export function receiveQuestions(questions) {
  return {
    type: C.RECEIVE_QUESTIONS,
    questions
  }
}