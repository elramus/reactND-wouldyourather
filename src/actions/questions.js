import C from '../utils/constants'

export function receiveQuestions(questions) {
  return {
    type: C.RECEIVE_QUESTIONS,
    questions
  }
}

export function answerQuestion(userId, questionId, option) {
  return {
    type: C.ANSWER_QUESTION,
    userId,
    questionId,
    option
  }
}