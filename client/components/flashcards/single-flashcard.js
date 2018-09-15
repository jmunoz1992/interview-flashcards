import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, fetchFlashcards, deleteFlashcard, updatePoints, updateThisFlashcard} from '../../store'
import {Card, Button, TextArea, Form, Message, Icon} from 'semantic-ui-react'
import {EditFlashcard} from '../index'
import { Link } from 'react-router-dom'

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

  handleChange = (evt) => {
    this.setState({inputAnswer: evt.target.value})
  }

  handleSubmit = (evt) => {
    const {flashcard, user} = this.props
    evt.preventDefault()
    const flashcardAnswer = flashcard.answer
    const inputAnswer = this.state.inputAnswer
    if(flashcardAnswer === inputAnswer) {
      const {question, answer, type, id} = flashcard
      if(flashcard) {
        if(flashcard.gotCorrect === null) {
          this.setState({correctAnswer: true})
          this.props.updateFlashcard({
            id,
            question,
            answer,
            type,
            gotCorrect: true,
          })
          if(user.id) {
            this.props.updateUserPoints({
              id: user.id,
              totalPoints: user.totalPoints + 1,
            });
          }
        }
      }
    } else {
      this.setState({correctAnswer: false})
    }
    this.setState({submitted: true})
  }

  backClick = () => {
    console.log('back clickinnn')
  }

  forwardClick = () => {
    console.log('forward clickinnn')
  }

  render() {
    const {flashcard, flashcards, flashcardsCorrect, pack} = this.props
    const {correctAnswer, submitted} = this.state
    const headingStyle = {
      textAlign: 'center',
      margin: '0 auto',
      width: '80%',
    }
    const submitStyle = {
      width: '100%'
    }
    const cardStyle = {
      width: '1000px',
      // marginLeft: '20px'
    }
    const textBoxStyle = {
      minHeight: 100,
      width: "820px"
    }
    const buttonStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
    return (
      <div style={headingStyle}>
        <h1>Flashcard {flashcard ? `#${flashcard.id}` : null} In {pack ? pack.name: null}</h1>
        <Button><Link to={`/packs/${pack ? pack.id : null}/flashcards`}>Go to all {pack ? pack.name : null} flashcards</Link></Button>
        <h4>Completed {flashcardsCorrect.length} out of {flashcards.length} flashcards in {pack ? pack.name : null} pack.</h4>
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
                <TextArea autoHeight placeholder='Insert answer here' style={textBoxStyle} onChange={this.handleChange}/>
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
  const flashcards = state.flashcards.filter(curFlashcard => curFlashcard.packId === packNum);
  const flashcardsCorrect = flashcards.filter(disFlashcard => disFlashcard.gotCorrect)
  const user = state.user
  return {
    flashcard,
    flashcards,
    flashcardsCorrect,
    pack,
    user,
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
    updateUserPoints(user) {
      dispatch(updatePoints(user))
    },
    updateFlashcard(flashcard) {
      dispatch(updateThisFlashcard(flashcard))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleFlashcard)
