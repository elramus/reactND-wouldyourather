import React, { Component, Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Header'
import SignIn from './SignIn'
import QuestionList from './QuestionList';
import Question from './Question'
import Loading from './Loading'
import {
  _getUsers,
  _getQuestions
} from '../utils/_DATA'
import {
  receiveUsers,
  receiveQuestions
} from '../actions'

class App extends Component {
  componentDidMount() {
    _getUsers().then(res => {
      this.props.dispatch(receiveUsers(res))
    })
    _getQuestions().then(res => {
      this.props.dispatch(receiveQuestions(res))
    })
  }

  render() {
    const { authedUser, questions } = this.props

    if (authedUser === null) {
      return  <SignIn />
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
            <Route path='/question/:questionId' exact component={Question} />
            {/* <Route path='/new' component={ } /> */}
            {/* <Route path='/leaderboard' component={ } /> */}
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
