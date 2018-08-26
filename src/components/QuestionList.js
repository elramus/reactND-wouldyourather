import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview';

class QuestionList extends Component {
  state = {
    filter: 'unanswered'
  }

  onFilterClick = (e) => {
    this.setState({ filter: e.target.dataset.filterName})
  }

  render() {
    const { filter } = this.state
    const { authedUser, questions } = this.props

    const answeredQuestions = [];
    const unansweredQuestions = [];

    questions.forEach(question => {
      if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
        answeredQuestions.push(question)
      } else {
        unansweredQuestions.push(question)
      }
    })

    return (
      <div className='question-list-container'>
        <ul className="question-type-filter">
          <li onClick={this.onFilterClick} data-filter-name='all' className={filter === 'all' ? 'active' : ''}>All</li>
          <li onClick={this.onFilterClick} data-filter-name='unanswered' className={filter === 'unanswered' ? 'active' : ''}>Unanswered</li>
          <li onClick={this.onFilterClick} data-filter-name='answered' className={filter === 'answered' ? 'active' : ''}>Answered</li>
        </ul>
        {questions && (
          <ul className='question-list'>
            {filter === 'all' && (
              questions.map(question => (
                <li key={question.id}>
                  <QuestionPreview question={question} authedUser={authedUser}/>
                </li>
            )))}
            {filter === 'unanswered' && (
              unansweredQuestions.map(question => (
                <li key={question.id}>
                  <QuestionPreview question={question} authedUser={authedUser}/>
                </li>
            )))}
            {filter === 'answered' && (
              answeredQuestions.map(question => (
                <li key={question.id}>
                  <QuestionPreview question={question} authedUser={authedUser}/>
                </li>
            )))}
          </ul>
        )}
       </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    questions: Object.keys(questions).map(id => questions[id]).sort((a,b) => b.timestamp - a.timestamp)
  }
}

export default connect(mapStateToProps)(QuestionList)