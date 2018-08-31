import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserBadge from './UserBadge'
import { addAndSaveNewQuestion } from '../actions/questions'
import { FaCircleNotch } from 'react-icons/fa'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    isProcessing: false
  }

  onOptionOneInput = (e) => {
    this.setState({ optionOne: e.target.value })
  }

  onOptionTwoInput = (e) => {
    this.setState({ optionTwo: e.target.value })
  }

  onSubmitQuestion = () => {
    new Promise((res, rej) => {
      this.setState({ isProcessing: true })
      this.props.dispatch(addAndSaveNewQuestion({
        optionOneText: this.state.optionOne,
        optionTwoText: this.state.optionTwo,
        author: this.props.authedUser
      }, res, rej))
    })
    .then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    const { optionOne, optionTwo, isProcessing } = this.state
    const { authedUser } = this.props
    const submitButtonDisabled = this.state.optionOne.length === 0 || this.state.optionTwo.length === 0 || this.state.isProcessing
      ? true
      : false

    return (
      <div className='question-new'>
        <form>

          <div className='left'>
            <h4>Would you rather:</h4>
            <input type='text' id='optionOne' value={optionOne} onChange={this.onOptionOneInput} />
            <span>or...</span>
            <input type='text' id='optionTwo' value={optionTwo} onChange={this.onOptionTwoInput} />
          </div>

          <div className='right'>
            <UserBadge user={authedUser} />
          </div>

        </form>
        <button className='btn-accent' onClick={this.onSubmitQuestion} disabled={submitButtonDisabled}>
          {isProcessing
            ? <FaCircleNotch className='spinning' />
            : 'Ask!'
          }
        </button>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))