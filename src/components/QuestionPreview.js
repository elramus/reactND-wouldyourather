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
              <h6>Would you rather:</h6>
              <p>{question.optionOne.text} or ...</p>
            </div>
            <Link to={`/question/${question.id}`}>
              <button className='btn-accent'>Answer!</button>
            </Link>
          </Fragment>
        )}
        {(votedOne || votedTwo) && (
          <Fragment>
            <div className="question-text-preview">
              <h6>Would you rather:</h6>
              <ul>
                <li className={votedOne ? 'chosen' : ''}>
                  <p>{question.optionOne.text}{votedOne && <FaCheck />}</p>
                </li>
                <li className={votedTwo ? 'chosen' : ''}>
                  <p>{question.optionTwo.text}{votedTwo && <FaCheck />}</p>
                </li>
              </ul>
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