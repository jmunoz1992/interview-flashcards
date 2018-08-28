import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const leftNav = {
    flexGrow: 1,
    display: "flex"
  }
  const rightNav = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end"
  }
  const h3Style = {
    margin: '0.5em 0.75em'
  }
  const homeLogoutStyle = {
    margin: '0.5em 0.75em',
    color: 'blue'
  }
  return (
    <div>
      <nav>
      {isLoggedIn ? (
        <div id="full-nav">
          <div style={leftNav}>
            <Link style={homeLogoutStyle} to="/">Home</Link>
          </div>
          <div style={rightNav}>
            <h3 style={h3Style}>Welcome {user.email}</h3>
            <h3 style={h3Style}>Total Points: {user.totalPoints}</h3>
            <a style={homeLogoutStyle} onClick={handleClick}>
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
}

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
