import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards, postFlashcard, deleteFlashcard, updateThisFlashcard} from '../store'
import { Card, TextArea, Form, Button, Message, Modal, Input } from 'semantic-ui-react'
import user from '../store/user';

/**
 * COMPONENT
 */
class EachFlashcard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      count: 0,
      input: "",
      inputCheck: "",
      modalOpen: false,
      editModalOpen: false,
      isSubmittedSuccess: false,
    }
  }

  componentDidMount() {
    this.props.getFlashcards();
  }

  toggleDescriptionClick = () => {
    if(!this.state.active) {
      this.setState({active: true})
    } else {
      this.setState({active: false})
    }
  }

  goToCardClick = (evt) => {
    const typeOfCard = evt.target.value;
    const {count} = this.state;
    const {flashcards} = this.props;
    let newCount = 0;
    if(typeOfCard === "nextClick" && count < flashcards.length - 1) {
      newCount = count + 1;
    } else if(typeOfCard === "prevClick" && count > 0) {
      newCount = count - 1;
    } else {
      newCount = 0;
    }
    this.setState({
      count: newCount,
      inputCheck: "",
      input: "",
      active: false,
    });
  }

  handleChange = (evt) => {
    this.setState({input: evt.target.value});
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const userInput = this.state.input;
    const flashcardAnswer = this.props.flashcards[this.state.count].answer;
    console.log('flashcard answer ', flashcardAnswer);
    console.log('user input ', userInput);
    if(userInput === "") {
      this.setState({inputCheck: "Please Type In An Answer Below"})
    } else if(this.checkAnswers(userInput, flashcardAnswer)) {
      this.setState({inputCheck: "You Got It!", isSubmittedSuccess: true});
    } else {
      this.setState({inputCheck: "Not Quite, Try Again!"});
    }
  }

  checkAnswers = (userInput, flashcardAnswer) => {
    return userInput === flashcardAnswer;
  }

  closeEditModal = () => {
    this.setState({ editModalOpen: false });
  };

  deleteCardClick = (evt) => {
    const cardToDelete = this.props.flashcards.filter(flashcard => flashcard.id === +evt.target.value)
    this.props.removeFlashcard(cardToDelete[0]);
  }

  editCardClick = (evt) => {
    evt.preventDefault();
    const cardToUpdate = this.props.flashcards.filter(flashcard => flashcard.id === +evt.target.id.value)
    this.props.updateFlashcard({
      id: +evt.target.id.value,
      question: evt.target.question.value,
      answer: evt.target.answer.value,
      type: cardToUpdate[0].type
    });
    this.closeEditModal();
  }

  render () {
    const { flashcards, chosenPack } = this.props;
    let filteredFlashcards;
    if(flashcards.length) {
      filteredFlashcards = flashcards.filter(flashcard => {
          if(chosenPack && flashcard && flashcard.type.toLowerCase() === chosenPack.name.toLowerCase()) {
            return flashcard;
          }
        })
    }
    const {count, inputCheck, input, isSubmittedSuccess} = this.state;
    const divStyle = {
      width: '50%',
      margin: '0 auto',
      textAlign: 'center'
    };
    const cardStyle = {
      width: '50%',
      margin: 'auto auto',
    };
    return (
      <div style={divStyle}>
        <h1>{chosenPack ? chosenPack.name : null} Flashcards</h1>
        <div>
          {filteredFlashcards && count < filteredFlashcards.length && chosenPack?
            <div>
              <br />
              <br />
              <div style={cardStyle}>
                <Card key={filteredFlashcards[count].id} onClick={this.toggleDescriptionClick}>
                  <Card.Content>
                    <Card.Header>{filteredFlashcards[count].question}</Card.Header>
                    {this.state.active ? <Card.Description>{filteredFlashcards[count].answer}</Card.Description> : null}
                  </Card.Content>
                </Card>
                <br />
                <Modal trigger={<Button onClick={this.openEditModal}>Edit This Flashcard</Button>} open={this.state.editModalOpen}>
                  <Form onSubmit={this.editCardClick}>
                    <Modal.Content>
                      <Modal.Description>
                        Id: <Input name="id" value={filteredFlashcards[count].id} />
                        <br />
                        <br />
                        Question: <Input name="question" placeholder={filteredFlashcards[count].question} />
                        <br />
                        <br />
                        Answer: <Input name="answer" placeholder={filteredFlashcards[count].answer} />
                      </Modal.Description>
                    </Modal.Content>
                    <Button  type="submit" content="Submit" color="green"/>
                  </Form>
                </Modal>
                <Button value={filteredFlashcards[count].id} onClick={(evt) => this.deleteCardClick(evt)}>Delete This Card</Button>
              </div>
              <br />
              <br />
              <div>
                {inputCheck.length ?
                  inputCheck === "You Got It!" ?
                    (<Message positive>
                      <Message.Header>{inputCheck}</Message.Header>
                    </Message>)
                  :
                    (<Message negative>
                      <Message.Header>{inputCheck}</Message.Header>
                    </Message>)
                : null}
              </div>
              <br />
              <br />
              <div>
                {isSubmittedSuccess ? <Button>Count as Correct</Button> : null}
                <Form onSubmit={(evt) => this.handleSubmit(evt)}>
                  <TextArea type="text" placeholder="Type in answer here" value={input} onChange={this.handleChange}/>
                  <br />
                  <br />
                  <Button type="submit" content="Submit" color="green"/>
                </Form>
              </div>
              <br />
              <Button value="prevClick" onClick={(evt) => this.goToCardClick(evt)} content='Prev Card' icon='left arrow' labelPosition='left' />
              <Button value="nextClick" onClick={(evt) => this.goToCardClick(evt)} content='Next Card' icon='right arrow' labelPosition='right' />
              <br />
            </div>
            : <h2>There are currently no flashcards in this pack</h2>
          }
        </div>
        <br />
        <br />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  const packNum = +(window.location.pathname.split('/')[2]);
  const chosenPack = state.packs.filter(pack => pack.id === packNum)[0];
  return {
    flashcards: state.flashcards,
    chosenPack
  }
}

const mapDispatch = dispatch => {
  return {
    getFlashcards() {
      dispatch(fetchFlashcards())
    },
    addFlashcard(flashcard) {
      dispatch(postFlashcard(flashcard))
    },
    removeFlashcard(flashcard) {
      dispatch(deleteFlashcard(flashcard))
    },
    updateFlashcard(flashcard) {
      dispatch(updateThisFlashcard(flashcard))
    }
  }
}

export default connect(mapState, mapDispatch)(EachFlashcard)
