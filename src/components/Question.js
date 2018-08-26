import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import UserBadge from './UserBadge';
import { answerQuestion } from '../actions'

class Question extends Component {
  state = {
    votedFor: this.props.votedFor,
  }

  onOptionChoose = (e) => {
    !this.props.questionAnswered
      ? this.setState({ votedFor: e.target.value })
      : alert('You have already voted!')
  }

  onAnswerButton = () => {
    this.props.dispatch(answerQuestion(this.props.authedUser, this.props.question.id, this.state.votedFor))
  }

  render() {
    const { votedFor } = this.state
    const { authedUser, question, questionAnswered } = this.props

    return (
      <div>
        <div className="question-form">
          <p>Would you rather:</p>
          {!questionAnswered && (
            <Fragment>
              <ul>
                <li>
                  <input
                    type='radio'
                    id='optionOne'
                    name='options'
                    value='optionOne'
                    onChange={this.onOptionChoose}
                    checked={votedFor === 'optionOne'}
                  />
                  <label htmlFor='optionOne'>{question.optionOne.text}</label>
                </li>
                <li>
                  <input
                  type='radio'
                  id='optionTwo'
                  name='options'
                  value='optionTwo'
                  onChange={this.onOptionChoose}
                  checked={votedFor === 'optionTwo'}
                />
                  <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
                </li>
              </ul>
              <button className='btn-accent' onClick={this.onAnswerButton}>Final Answer!</button>
            </Fragment>
          )}
          {questionAnswered && (
            <ul>
              <li>
                <input
                  type='radio'
                  id='optionOne'
                  name='options'
                  value='optionOne'
                  onChange={this.onOptionChoose}
                  checked={votedFor === 'optionOne'}
                />
                <label htmlFor='optionOne'>{question.optionOne.text}</label>
              </li>
              <li>
                <input
                  type='radio'
                  id='optionTwo'
                  name='options'
                  value='optionalTwo'
                  onChange={this.onOptionChoose}
                  checked={votedFor === 'optionalTwo'}
                  />
                <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
              </li>
            </ul>
          )}
        </div>
        {authedUser && (
          <UserBadge />
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