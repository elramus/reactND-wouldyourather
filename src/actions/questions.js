import C from '../utils/constants'
import {
  _saveQuestionAnswer,
  _saveQuestion
} from '../utils/_DATA'
import { addQuestionToUser } from './'

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

export function answerAndSaveQuestion(userId, questionId, option) {
  return (dispatch) => {
    // Save answer in DB
    _saveQuestionAnswer({ userId, questionId, option })

    // Save answer in store
    dispatch(answerQuestion(userId, questionId, option))
  }
}

export function addAndSaveNewQuestion(question, resolve, reject) {
  return (dispatch) => {
    // Save new question in DB
    _saveQuestion(question)
      .then(res => {

        // Save new question in Questions store
        dispatch(receiveQuestions({ [res.id]: res } ))

        // Save new question in Users store
        dispatch(addQuestionToUser(res.author, res.id))

        // resolve optional callback
        resolve && resolve(res)
      })
      .catch(rej => {
        alert(`Oh nos! ${rej}`)
        // reject optional callback
        reject && reject(rej)
      })
  }
}