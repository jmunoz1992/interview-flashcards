import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards} from '../store'
import { Card, TextArea, Form, Button, Message } from 'semantic-ui-react'

/**
 * COMPONENT
 */
class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      count: 0,
      input: "",
      inputCheck: "",
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
    if(this.checkAnswers(userInput, flashcardAnswer)) {
      this.setState({inputCheck: "You Got It!"});
    } else {
      this.setState({inputCheck: "Not Quite, Try Again!"});
    }
  }

  checkAnswers = (userInput, flashcardAnswer) => {
    return userInput === flashcardAnswer;
  }

  render () {
    const { flashcards } = this.props;
    const {count, inputCheck} = this.state;
    const divStyle = {
      top: '50%',
      left: '50%',
      width: '50%',
      margin: '0 auto',
      textAlign: 'center'
    };
    const cardStyle = {
      width: '50%',
      margin: 'auto auto',
      textAlign: 'center'
    };
    const buttonStyle = {
      paddng: '50px',
      margin: '10px',
    }
    return (
      <div style={divStyle}>
        {flashcards.length && count < flashcards.length?
          <div>
            <h1>FLASHCARDS UP IN HURRRRR</h1>
            <br />
            <br />
            <div style={cardStyle}>
              <Card key={flashcards[count].id} onClick={this.toggleDescriptionClick}>
                <Card.Content>
                  <Card.Header>{flashcards[count].question}</Card.Header>
                  {this.state.active ? <Card.Description>{flashcards[count].answer}</Card.Description> : null}
                </Card.Content>
              </Card>
            </div>
            <br />
            <br />
            <div>
              {inputCheck.length ?
                inputCheck === "You Got It!" ?
                <Message positive>
                  <Message.Header>You Got It!</Message.Header>
                </Message> :
                <Message negative>
                  <Message.Header>Not Quite, Try Again!</Message.Header>
                </Message>
              : null}
            </div>
            <br />
            <br />
            <div>
              <Form onSubmit={this.handleSubmit}>
                <TextArea type="text" placeholder="Type in answer here" value={this.state.input} onChange={this.handleChange}/>
                <br />
                <br />
                <Button type="submit" content="Submit" color="green"/>
              </Form>
            </div>
          </div>
          : null
        }
        <br />
        <Button value="prevClick" onClick={(evt) => this.goToCardClick(evt)} content='Prev Card' icon='left arrow' labelPosition='left' />
        <Button value="nextClick" onClick={(evt) => this.goToCardClick(evt)} content='Next Card' icon='right arrow' labelPosition='right' />
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
