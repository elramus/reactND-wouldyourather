import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FaCheck } from 'react-icons/fa'

class QuestionPreview extends Component {
  render() {
    const { authedUser, question } = this.props

    const votedOne = question.optionOne.votes.includes(authedUser)
    const votedTwo = question.optionTwo.votes.includes(authedUser)

    const qPrevClasses = classNames({
      'question-preview': true,
      'answered': votedOne || votedTwo
    })

    return (
      <div className={qPrevClasses}>
        {!votedOne && !votedTwo && (
          <Fragment>
            <div className="question-text-preview">
              <span>Would you rather:</span>
              <p>{question.optionOne.text} or ...</p>
            </div>
            <Link to={`/question/${question.id}`}>
              <button className='btn-accent'>View!</button>
            </Link>
          </Fragment>
        )}
        {(votedOne || votedTwo) && (
          <Fragment>
            <div className="question-text-preview">
              <span>Would you rather:</span>
              <p className={votedOne ? 'chosen' : ''}>{question.optionOne.text}{votedOne && <FaCheck />}</p>
              <p className={votedTwo ? 'chosen' : ''}>{question.optionTwo.text}{votedTwo && <FaCheck />}</p>
            </div>
            <Link to={`/question/${question.id}`}>
              <button className='btn-accent'>Compare Results!</button>
            </Link>
          </Fragment>
        )}
      </div>
    )
  }
}

export default QuestionPreview