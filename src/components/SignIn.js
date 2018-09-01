import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUser } from '../actions'

class SignIn extends Component {
  state = {
    selectedUser: 'default'
  }

  onUserDropdownChange = (e) => {
    this.setState({
      selectedUser: e.target.value
    })
  }

  onGoClick = () => {
    this.props.dispatch(authUser(this.state.selectedUser))
  }

  render() {
    const { users } = this.props
    const isButtonDisabled = this.state.selectedUser === 'default'

    return (
      <div className='signin-container'>
        <h1>Would You Rather?</h1>
        <p>First things first. Who are you?</p>
        <select value={this.state.selectedUser} onChange={this.onUserDropdownChange}>
          <option value='default' disabled>Select User</option>
          {Object.keys(users).map(id =>
            <option key={id} value={users[id].id}>{users[id].name}</option>
          )}
        </select>
        <br />
        <button className='btn-accent' disabled={isButtonDisabled} onClick={this.onGoClick}>Go!</button>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(SignIn)