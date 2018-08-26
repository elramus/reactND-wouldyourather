import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserBadge extends Component {
  render() {
    const { user } = this.props

    return (
      <div className='user-badge'>
        <span>{user.name}</span>
        <div className='avatar' style={{'backgroundImage': `url('${user.avatarURL}')`}}></div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    user: users[authedUser] || { }
  }
}

export default connect(mapStateToProps)(UserBadge)