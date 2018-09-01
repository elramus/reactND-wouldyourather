import React, { Component, Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Header'
import SignIn from './SignIn'
import QuestionList from './QuestionList';
import Question from './Question'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'
import Loading from './Loading'
import {
  fetchUsers,
  fetchQuestions
} from '../actions'

class App extends Component {
  componentDidMount() {
    // Populate store with users from DB
    this.props.dispatch(fetchUsers())

    // Populate store with questions from DB
    this.props.dispatch(fetchQuestions())
  }

  render() {
    const { authedUser, questions } = this.props

    if (authedUser === null) {
      return <SignIn />
    }

    if (Object.keys(questions).length === 0) {
      return <Loading />
    }

    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Switch>
            <Route path='/' exact component={QuestionList} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={LeaderBoard} />
            <Route path='/question/:questionId' render={(props) => (
              !this.props.questions[props.match.params.questionId]
                ? <NotFound />
                : <Question />
            )} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    questions
  }
}
export default connect(mapStateToProps)(App)
