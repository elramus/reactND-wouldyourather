import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './SignIn'
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
    const { authedUser } = this.props
    return (
      <BrowserRouter>
        {!authedUser
          ? <SignIn />
          : <Switch>
              <Route path='/' render={() => (
                <h1>you're signed in</h1>
              )} />
            </Switch>
        }
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App)
