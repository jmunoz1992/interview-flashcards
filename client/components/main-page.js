import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards} from '../store'
import { Card } from 'semantic-ui-react'
import flashcard from '../store/flashcard';

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
    const {count} = this.state;
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
              <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Type in answer here" value={this.state.input} onChange={this.handleChange}/>
                <button type="submit">SUBMIT</button>
              </form>
            </div>
            <div>
              {this.state.inputCheck.length ? <p>{this.state.inputCheck}</p>: null}
            </div>
          </div>
          : null
        }
        <br />
        <button style={buttonStyle} value="prevClick" onClick={(evt) => this.goToCardClick(evt)}>PREV CARD</button>
        <button style={buttonStyle} value="nextClick" onClick={(evt) => this.goToCardClick(evt)}>NEXT CARD</button>
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
