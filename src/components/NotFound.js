import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className='notfound'>
    <h1>404! Page Not Found!</h1>
    <p>Hmm, looks like you're trying to access a page that doesn't exist.</p>
    <p><Link to='/'>Go home and try again?</Link></p>
  </div>
)

export default NotFound