import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards} from '../store'
import { Card } from 'semantic-ui-react'

/**
 * COMPONENT
 */
class MainPage extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.getFlashcards();
  }

    render () {
      const { flashcards } = this.props;
      console.log('flashcards ', flashcards);
      return (
        <div>
          <h1>FLASHCARDS UP IN HURRRRR</h1>
          {flashcards.map(flashcard =>
              <Card key={flashcard.id}>
                <Card.Content>
                  <Card.Header>{flashcard.question}</Card.Header>
                  <Card.Description>{flashcard.answer}</Card.Description>
                </Card.Content>
              </Card>
            )}
        </div>
      )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    flashcards: state.flashcards
  }
}

const mapDispatch = dispatch => {
  return {
    getFlashcards() {
      dispatch(fetchFlashcards())
    }
  }
}

export default connect(mapState, mapDispatch)(MainPage)
