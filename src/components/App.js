import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import SignIn from './SignIn';

class App extends Component {
  render() {
    return (
      <div>
        <Link to='/auth'>
          <p>Sign In here</p>
        </Link>
        <Route path='/auth' component={SignIn} />
      </div>
    );
  }
}

export default App;
