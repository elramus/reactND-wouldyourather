import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import UserBadge from './UserBadge'
import { answerAndSaveQuestion } from '../actions'
import { FaCheck, FaLongArrowAltLeft } from 'react-icons/fa'

class Question extends Component {
  state = {
    selectedOption: this.props.votedFor
  }

  onOptionChoose = (e) => {
    if (!this.props.questionAnswered) {
      this.setState({ selectedOption: e.target.value })
    }
  }

  onAnswerButton = () => {
    this.props.dispatch(answerAndSaveQuestion(this.props.authedUser, this.props.question.id, this.state.selectedOption))
  }

  render() {
    const { selectedOption } = this.state
    const { authedUser, question, questionAnswered, votedFor } = this.props
    const answerButtonDisabled = selectedOption === null
      ? true
      : false
    const questionClasses = classNames({
      'question-form': true,
      'answered': votedFor !== null
    })

    const votesForOne = question.optionOne.votes.length
    const votesForTwo = question.optionTwo.votes.length

    return (
      <div className={questionClasses}>
        <div className='left'>
          <h4>Would you rather:</h4>
          <ul>
            <li className={votedFor === 'optionOne' ? 'chosen' : ''}>
              <input
                type='radio'
                id='optionOne'
                name='options'
                value='optionOne'
                onChange={this.onOptionChoose}
                checked={selectedOption === 'optionOne'}
              />
              <label htmlFor='optionOne'>
                <p>
                  {question.optionOne.text}
                  {votedFor === 'optionOne' && (
                    <Fragment>
                      <FaCheck />
                      <span className='question-meta'>{Math.floor(votesForOne / (votesForOne + votesForTwo) * 100)}% ({votesForOne} out of {votesForOne + votesForTwo} users) chose this</span>
                    </Fragment>
                  )}
                </p>
              </label>
            </li>
            <li className={votedFor === 'optionTwo' ? 'chosen' : ''}>
              <input
                type='radio'
                id='optionTwo'
                name='options'
                value='optionTwo'
                onChange={this.onOptionChoose}
                checked={selectedOption === 'optionTwo'}
              />
              <label htmlFor='optionTwo'>
                <p>
                  {question.optionTwo.text}
                  {votedFor === 'optionTwo' && (
                    <Fragment>
                      <FaCheck />
                      <span className='question-meta'>{Math.floor(votesForOne / (votesForOne + votesForTwo) * 100)}% ({votesForOne} out of {votesForOne + votesForTwo} users) chose this</span>
                    </Fragment>
                  )}
                </p>
              </label>
            </li>
          </ul>
          {!questionAnswered && (
            <button className='btn-accent' onClick={this.onAnswerButton} disabled={answerButtonDisabled}>Final Answer!</button>
          )}
          {questionAnswered && (
            <Link to='/'>
              <button className='btn-accent'>
                <FaLongArrowAltLeft /> More Questions!
              </button>
            </Link>
          )}
        </div>
        {authedUser && (
          <div className="right">
            <UserBadge user={question.author} />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }, { match }) {
  const question = questions[match.params.questionId]
  const votedFor = question.optionOne.votes.includes(authedUser)
    ? 'optionOne'
    : question.optionTwo.votes.includes(authedUser)
      ? 'optionTwo'
      : null

  return {
    authedUser,
    question,
    votedFor,
    questionAnswered: votedFor === null ? false : true
  }
}

export default withRouter(connect(mapStateToProps)(Question))