import React from 'react'
import {connect} from 'react-redux'
import {fetchFlashcards, fetchPacks} from '../store'
import { Link } from 'react-router-dom'
import {AddFlashcard} from './index'

/**
 * COMPONENT
 */
class AllFlashcards extends React.Component {
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
      margin: '40% auto',
      fontSize: '15px',
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
          <div>
            {flashcards.length && pack ?
              <div>
                <br /><br />
                <div style={headingStyle}>
                  <AddFlashcard />
                </div>
                <br /><br />
                <div style={mainStyle}>
                {
                  flashcards.map(flashcard => {
                    return (
                      <div key={flashcard.id} style={cardStyle}>
                        <Link to={`/packs/${pack.id}/flashcards/${flashcard.id}`}>
                          <div style={textStyle}>{flashcard.question}</div>
                        </Link>
                      </div>)
                })}
                </div>
              </div>
            :
            <div style={headingStyle}>
              <br /><br />
              <h3>There are currently no flashcards in here. Add a flashcard.</h3>
              <br /><br />
              <AddFlashcard />
            </div>
            }
            <br /><br/>
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
  const pack = state.packs.filter(thisPack => thisPack.id === packNum)[0];
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
