import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards, fetchPacks} from '../store'
import {Card, Button, Modal, Form, Input} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {AddFlashcard} from './index'

/**
 * COMPONENT
 */
class AllFlashcards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getFlashcards();
    this.props.getPacks();
  }

  render () {
    const {flashcards, pack} = this.props
    const cardStyle = {
      width: '20%',
      margin: '1em 1em',
      textAlign: 'center',
      border: '5px solid grey',
      padding: '10px',
    }
    const mainStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }
    const textStyle = {
      margin: '30% auto',
    }
    const headingStyle = {
      textAlign: 'center',
      margin: '0 auto',
      width: '50%',
    }
    return (
      <div>
        <h1 style={headingStyle}>All {pack ? pack.name : null} Flashcards</h1>
        <div>
          <div style={mainStyle}>
            {flashcards.length ? flashcards.map(flashcard => {
              return (
                <div key={flashcard.id} style={cardStyle}>
                    <div style={textStyle}>{flashcard.question}</div>
                </div>)
            }) :
            <div style={headingStyle}>
              <br /><br />
              <h2>There are currently no flashcards in here. Add a flashcard.</h2>
            </div>
            }
            <br /><br/>
            <AddFlashcard />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  const packNum = +(window.location.pathname.split('/')[2]);
  const flashcards = state.flashcards.filter(flashcard => flashcard.packId === packNum);
  const pack = state.packs.filter(pack => pack.id === packNum)[0];
  return {
    flashcards,
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

export default connect(mapState, mapDispatch)(AllFlashcards)
