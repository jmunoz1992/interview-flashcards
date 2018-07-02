import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards} from '../store'

/**
 * COMPONENT
 */
export const MainPage = props => {
  const flashcards = props.getFlashcards();
  console.log('flashcards in here ', flashcards);
  return (
    <div>
      <h3>FLASHCARDS WILL BE IN HERE</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state ', state);
  return {}
}

const mapDispatch = dispatch => {
  return {
    getFlashcards() {
      dispatch(fetchFlashcards())
    }
  }
}

export default connect(mapState, mapDispatch)(MainPage)
