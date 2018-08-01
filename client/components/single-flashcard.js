import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, fetchFlashcards} from '../store'
import {Card} from 'semantic-ui-react'

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
    if(!this.state.active) {
      this.setState({active: true})
    } else {
      this.setState({active: false})
    }
  }

  render() {
    console.log('flashcard in here: ', this.props.flashcard)
    console.log('pack in here ', this.props.pack)

    const {flashcard, pack} = this.props
    const headingStyle = {
      textAlign: 'center',
      margin: '0 auto',
      width: '50%',
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
  }
}

export default connect(mapState, mapDispatch)(SingleFlashcard)
