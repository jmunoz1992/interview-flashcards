import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { StatisticLabel } from '../../node_modules/semantic-ui-react';

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div id="full-nav">
          {/* The navbar will show these links after you log in */}
          <div id="left-nav">
            <Link to="/">Home</Link>
          </div>
          <div id="right-nav">
            <h3 id="welcome-email">Welcome {user.email}</h3>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
