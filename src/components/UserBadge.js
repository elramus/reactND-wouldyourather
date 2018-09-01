import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserBadge = ({ user }) => (
  <div className='user-badge'>
    <Link to='/leaderboard'>
      <span>{user.name}</span>
      <div className='avatar' style={{'backgroundImage': `url('${user.avatarURL}')`}}></div>
    </Link>
  </div>
)

function mapStateToProps({ users }, ownProps) {
  return {
    user: users[ownProps.user]
  }
}

export default connect(mapStateToProps)(UserBadge)

UserBadge.propTypes = {
  user: PropTypes.object.isRequired
}