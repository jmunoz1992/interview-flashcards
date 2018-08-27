import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, fetchFlashcards, deleteFlashcard} from '../../store'
import {Card, Button, TextArea, Form, Message} from 'semantic-ui-react'
import {EditFlashcard} from '../index'
import history from '../../history'
import { combineReducers } from 'redux';

class SingleFlashcard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      inputAnswer: "",
      correctAnswer: "",
      submitted: false,
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

  handleChange = (evt) => {
    this.setState({inputAnswer: evt.target.value})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const flashcardAnswer = this.props.flashcard.answer
    const inputAnswer = this.state.inputAnswer
    if(flashcardAnswer === inputAnswer) {
      this.setState({correctAnswer: true})
    } else {
      this.setState({correctAnswer: false})
    }
    this.setState({submitted: true})
  }

  render() {
    const {flashcard, pack} = this.props
    const {correctAnswer, inputAnswer, submitted} = this.state
    console.log('input answer ', inputAnswer.length)
    console.log('correct answer ', correctAnswer.length)
    const headingStyle = {
      textAlign: 'center',
      margin: '0 auto',
      width: '50%',
    }
    const buttonStyle = {
      display: 'flex',
      flexDirection: 'row',
    }
    const submitStyle = {
      width: '100%'
    }
    const cardStyle = {
      maxWidth: '500px',
      marginLeft: '20px'
    }
    return (
      <div style={headingStyle}>
        <h1>Flashcard {flashcard ? `#${flashcard.id}` : null} In {pack ? pack.name : null}</h1>
        <div style={headingStyle}>
          {flashcard ?
            <div>
              <Card style={cardStyle} onClick={this.toggleDescriptionClick}>
                <Card.Content>
                  <Card.Header>{flashcard.question}</Card.Header>
                  {this.state.active ? <Card.Description>{flashcard.answer}</Card.Description> : null}
                </Card.Content>
              </Card>
              <Form onSubmit={this.handleSubmit}>
                <TextArea autoHeight placeholder='Insert answer here' style={{ minHeight: 100, width: "300px" }} onChange={this.handleChange}/>
                <br /><br />
                {submitted ?
                  <div>
                  {correctAnswer ?
                    <Message positive>YOU GOT IT</Message> :
                    <Message negative>TRY AGAIN</Message>}
                  </div>
                  : null}
                <Button type="submit" color="green" style={submitStyle}>Submit</Button>
                <br /><br />
              </Form>
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
