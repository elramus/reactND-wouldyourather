import C from '../utils/constants'
import {
  _getQuestions,
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

export function fetchQuestions() {
  return (dispatch) => {
    _getQuestions()
      .then(res => {
        dispatch(receiveQuestions(res))
      })
  }
}

export function answerAndSaveQuestion(authedUser, qid, answer) {
  return (dispatch) => {
    // Save answer in DB
    _saveQuestionAnswer({ authedUser, qid, answer })

    // Optimistically save answer in store
    dispatch(answerQuestion(authedUser, qid, answer))
  }
}

export function addAndSaveNewQuestion(question, resolve, reject) {
  // Note: I've built into this Thunk the ability to resolve/reject,
  // if passed in from a promise. This way the component that dispatches
  // it can do things based on the result of whatever APIs we call here.
  return (dispatch) => {
    // Save new question in DB
    _saveQuestion(question)
      .then(res => {
        // Save new question in Questions store
        dispatch(receiveQuestions({ [res.id]: res } ))

        // Save new question in Users store
        dispatch(addQuestionToUser(res.author, res.id))

        // Resolve optional callback
        resolve && resolve(res)
      })
  }
}