import React from 'react'
import { connect } from 'react-redux'

const LeaderBoard = ({ users }) => {
  const sortedUsers = users.sort((a, b) => {
    const scoreA = Object.keys(a.answers).length + a.questions.length
    const scoreB = Object.keys(b.answers).length + b.questions.length
    if (scoreA > scoreB) {
      return -1
    } else {
      return 1
    }
  })

  return (
    <div className='lb-container'>
      <ul className='lb-container_lb-list'>
        {sortedUsers.map(user => (
          <li key={user.id}>
            <div className="left">
              <div className='avatar' style={{
                'backgroundImage': `url('${user.avatarURL}')`
              }}></div>
            </div>
            <div className="center">
              <h3>{user.name}</h3>
              <p>Answered Questions: {Object.keys(user.answers).length}</p>
              <p>Questions Asked: {user.questions.length}</p>
            </div>
            <div className="right">
              <div className="score">
                <span className='label'>Score</span>
                <span className='count'>{Object.keys(user.answers).length + user.questions.length}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map(uId => users[uId])
  }
}

export default connect(mapStateToProps)(LeaderBoard)