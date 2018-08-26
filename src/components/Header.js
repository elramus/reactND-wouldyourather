import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav';
import UserBadge from './UserBadge';
import { FaSignOutAlt } from 'react-icons/fa'
import { authUser } from '../actions'

class Header extends Component {
  onSignOut = () => {
    this.props.dispatch(authUser(null))
  }

  render() {
    return (
      <header className='site-header'>
        <div className="site-header__left">
          <Link to='/'>
            <h1>Would You Rather!?</h1>
          </Link>
          <Nav />
        </div>
        <div className="site-header__right">
          <button className='sign-out react-icon' onClick={this.onSignOut} title='Sign Out'>
            <FaSignOutAlt />
          </button>
          <UserBadge />
        </div>
      </header>
    )
  }
}

export default connect()(Header)