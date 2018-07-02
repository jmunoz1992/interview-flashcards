import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const MainPage = props => {
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
}

export default connect(mapState, null)(MainPage)
