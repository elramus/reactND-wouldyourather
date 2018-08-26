import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import UserBadge from './UserBadge'
import { answerQuestion } from '../actions'
import { FaCheck } from 'react-icons/fa'

class Question extends Component {
  state = {
    votedFor: this.props.votedFor,
    selectedOption: this.props.votedFor
  }

  onOptionChoose = (e) => {
    if (!this.props.questionAnswered) {
      this.setState({ selectedOption: e.target.value })
    }
  }

  onAnswerButton = () => {
    this.props.dispatch(answerQuestion(this.props.authedUser, this.props.question.id, this.state.selectedOption))
  }

  render() {
    const { selectedOption } = this.state
    const { authedUser, question, questionAnswered, votedFor } = this.props

    const questionClasses = classNames({
      'question-form': true,
      'answered': votedFor !== null
    })

    const votesForOne = question.optionOne.votes.length
    const votesForTwo = question.optionTwo.votes.length

    return (
      <div className={questionClasses}>
        <div className='left'>
          <h6>Would you rather:</h6>
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
                        <span className='question-meta'>{votesForTwo / (votesForOne + votesForTwo) * 100}% of users chose this</span>
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
                        <span className='question-meta'>{votesForTwo / (votesForOne + votesForTwo) * 100}% of users chose this</span>
                      </Fragment>
                    )}
                  </p>
                </label>
              </li>
            </ul>
            {!questionAnswered && (
              <button className='btn-accent' onClick={this.onAnswerButton}>Final Answer!</button>
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

export default connect(mapStateToProps)(Question)