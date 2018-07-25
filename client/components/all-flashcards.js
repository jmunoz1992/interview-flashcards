import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards, fetchPacks} from '../store'
import {Card, Button, Modal, Form, Input} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {EditPack, AddPack} from './index'

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
    const {flashcards, } = this.props
    console.log('this props in flashcards ', flashcards);
    return (
      <div>
        <h1>All Flashcards in HERE</h1>
        {flashcards.length ? flashcards.map(flashcard => {
          return (<h1 key={flashcard.id}>{flashcard.question}</h1>)
        }) : null}
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
  console.log('chosen pack in state ', flashcards);
  return {
    flashcards
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
    // removePack(pack) {
    //   dispatch(deletePack(pack))
    // },
    // addPack(pack) {
    //   dispatch(postPack(pack))
    // },
  }
}

export default connect(mapState, mapDispatch)(AllFlashcards)
