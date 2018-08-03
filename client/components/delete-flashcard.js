import React from 'react'
import {connect} from 'react-redux'
import {updateThisFlashcard} from '../store'

class DeleteFlashcard extends React.Component {
  deleteCardClick = (evt) => {
    const cardToDelete = this.props.flashcards.filter(flashcard => flashcard.id === +evt.target.value)
    this.props.removeFlashcard(cardToDelete[0]);
  }

  render() {
    const {flashcard} = this.props
    return (
      <div>
      {flashcard ?
      <div>
      </div>
      : null
      }
      </div>
    )
  }

}

/**
 * CONTAINER
 */

const mapDispatch = dispatch => {
  return {
    updateFlashcard(flashcard) {
      dispatch(updateThisFlashcard(flashcard))
    }
  }
}

export default connect(null, mapDispatch)(DeleteFlashcard)
