import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, fetchFlashcards, deleteFlashcard} from '../../store'
import {Card, Button} from 'semantic-ui-react'
import {EditFlashcard} from '../index'
import history from '../../history'

class SingleFlashcard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
    }
  }

  componentDidMount() {
    this.props.getFlashcards()
    this.props.getPacks()
  }

  toggleDescriptionClick = () => {
    (!this.state.active) ? this.setState({active: true}) : this.setState({active: false})
  }

  deleteCardClick = async () => {
    await this.props.removeFlashcard(this.props.flashcard);
    history.push(`/packs/${this.props.pack.id}/flashcards`)
  }

  render() {
    const {flashcard, pack} = this.props
    const headingStyle = {
      textAlign: 'center',
      margin: '0 auto',
      width: '50%',
    }
    const buttonStyle = {
      display: 'flex',
      flexDirection: 'row',
    }
    return (
      <div style={headingStyle}>
        <h1>Flashcard {flashcard ? `#${flashcard.id}` : null} In {pack ? pack.name : null}</h1>
        <div style={headingStyle}>
          {flashcard ?
            <div>
              <Card onClick={this.toggleDescriptionClick}>
                <Card.Content>
                  <Card.Header>{flashcard.question}</Card.Header>
                  {this.state.active ? <Card.Description>{flashcard.answer}</Card.Description> : null}
                </Card.Content>
                </Card>
                <div style={buttonStyle}>
                  <EditFlashcard flashcard={flashcard}/>
                  <Button color="red" onClick={this.deleteCardClick}>Delete This Flashcard</Button>
                </div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = state => {
  const flashcardId = +(window.location.pathname.split('/')[4]);
  const packNum = +(window.location.pathname.split('/')[2]);
  const flashcard = state.flashcards.filter(thisFlashcard => thisFlashcard.id === flashcardId)[0];
  const pack = state.packs.filter(thisPack => thisPack.id === packNum)[0];
  return {
    flashcard,
    pack
  }
}

const mapDispatch = dispatch => {
  return {
    getFlashcards() {
      dispatch(fetchFlashcards())
    },
    getPacks() {
      dispatch(fetchPacks())
    },
    removeFlashcard(flashcard) {
      dispatch(deleteFlashcard(flashcard))
    },
  }
}

export default connect(mapState, mapDispatch)(SingleFlashcard)
