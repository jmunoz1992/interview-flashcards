import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards} from '../store'
import { Card } from 'semantic-ui-react'

/**
 * COMPONENT
 */
class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      count: 0,
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

  goToNextCardClick = () => {
    let newCount = 0;
    console.log('state count ', this.state.count);
    console.log('length ', this.props.flashcards.length);
    if(this.state.count < this.props.flashcards.length - 1) {
      newCount = this.state.count + 1;
    } else {
      newCount = 0;
    }
    this.setState({count: newCount});
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
    return (
      <div style={divStyle}>
        {flashcards.length && count < flashcards.length?
          <div>
            <h1>FLASHCARDS UP IN HURRRRR</h1>
            <div style={divStyle}>
              <Card key={flashcards[count].id} onClick={this.toggleDescriptionClick}>
                <Card.Content>
                  <Card.Header>{flashcards[count].question}</Card.Header>
                  {this.state.active ? <Card.Description>{flashcards[count].answer}</Card.Description> : null}
                </Card.Content>
              </Card>
            </div>
          </div>
          : null
        }
        <button onClick={this.goToNextCardClick}>NEXT CARD</button>
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
