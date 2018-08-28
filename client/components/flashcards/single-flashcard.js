import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, fetchFlashcards, deleteFlashcard, updatePoints} from '../../store'
import {Card, Button, TextArea, Form, Message, Icon} from 'semantic-ui-react'
import {EditFlashcard} from '../index'
import history from '../../history'

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
      if(this.props.user.id) {
        this.props.updateUserPoints({
          id: this.props.user.id,
          totalPoints: this.props.user.totalPoints + 1
        });
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
    const {flashcard, pack} = this.props
    const {correctAnswer, inputAnswer, submitted} = this.state
    const headingStyle = {
      textAlign: 'center',
      margin: '0 auto',
      width: '80%',
    }
    const buttonStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
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
                <Icon id="leftArrow" name="arrow circle left" size="big" onClick={this.backClick}/>
                <EditFlashcard flashcard={flashcard}/>
                <Button color="red" onClick={this.deleteCardClick}>Delete This Flashcard</Button>
                <Icon style={{marginLeft: "25px", marginTop: "4px", height:"20px"}} name="arrow circle right" size="big" onClick={this.forwardClick}/>
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
  const user = state.user
  return {
    flashcard,
    pack,
    user
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
    updateUserPoints(user) {
      dispatch(updatePoints(user))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleFlashcard)
