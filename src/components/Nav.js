import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <ul className='site-nav'>
        <li>
          <NavLink activeClassName='current' to='/'>Questions</NavLink>
        </li>
        <li>
          <NavLink activeClassName='current' to='/new'>Ask a New Question</NavLink>
        </li>
        <li>
          <NavLink activeClassName='current' to='/leaderboard'>Leader Board</NavLink>
        </li>
      </ul>
    )
  }
}

export default Nav