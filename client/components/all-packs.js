import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, deletePack, postPack} from '../store'
import {Card, Button, Modal, Form, Input} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {EditPack, AddPack, AllFlashcards} from './index'

/**
 * COMPONENT
 */
class AllPacks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getPacks();
  }

  deletePackClick = (evt) => {
    const packToDelete = this.props.packs.filter(pack => pack.id === +evt.target.value)
    this.props.removePack(packToDelete[0]);
  }


  submitNewPack = (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value;
    this.props.addPack({
      name
    })
    this.closeModal();
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };


  render () {
    const { packs } = this.props;
    const divStyle = {
      width: '50%',
      margin: '0 auto',
      textAlign: 'center',
    };
    const cardStyle = {
      textAlign: 'center',
      border: '5px solid grey',
      color: 'black',
      padding: '5em'
    }
    const buttonStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }
    const mainStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      margin: '5em'
    }
    return (
      <div>
        <div style={divStyle}>
          <h1>All Flashcard Packs</h1>
          <br />
          <AddPack />
        </div>
        <br />
          {packs.length ?
            <div style={mainStyle}>
            {
              packs.map(pack => {
                return (
                  <div key={pack.id}>
                    <Link to={`/packs/${pack.id}/flashcards`}>
                      <div style={cardStyle}>{pack.name}</div>
                    </Link>
                    <br />
                    <div style={buttonStyle}>
                      <EditPack pack={pack} />
                      <Button value={pack.id} onClick={(evt) => this.deletePackClick(evt)}>Delete This Pack</Button>
                    </div>
                    <br /><br />
                  </div>
                )
              })
             }
             </div>
             : null
          }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    packs: state.packs
  }
}

const mapDispatch = dispatch => {
  return {
    getPacks() {
      dispatch(fetchPacks())
    },
    removePack(pack) {
      dispatch(deletePack(pack))
    },
    addPack(pack) {
      dispatch(postPack(pack))
    },
  }
}

export default connect(mapState, mapDispatch)(AllPacks)
