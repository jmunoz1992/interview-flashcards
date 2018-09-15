import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchFlashcards} from '../store'

class Navbar extends React.Component {
  componentDidMount() {
    this.props.getFlashcards();
  }
  render() {
    const {handleClick, isLoggedIn, user, flashcards} = this.props
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
      margin: '0.5em 0.75em',
      display: 'inline'
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
              <h3><Link style={homeLogoutStyle} to="/">All Packs</Link></h3>
              <h3 style={h3Style}>Hi {user.email}</h3>
              <h3 style={h3Style}>Completed {user.totalPoints ? user.totalPoints : 0} /{flashcards.length} total flashcards</h3>
            </div>
            <div style={rightNav}>
              <h3><a style={homeLogoutStyle} onClick={handleClick}>
                Logout
              </a></h3>
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
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    flashcards: state.flashcards
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getFlashcards() {
      dispatch(fetchFlashcards())
    },
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
