import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, deletePack, postPack, editPack} from '../store'
import {Card, Button, Modal, Form, Input} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
class AllPacks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      editModalOpen: false
    }
  }

  componentDidMount() {
    this.props.getPacks();
  }

  deletePackClick = (evt) => {
    const packToDelete = this.props.packs.filter(pack => pack.id === +evt.target.value)
    this.props.removePack(packToDelete[0]);
  }

  editPackClick = (evt) => {
    evt.preventDefault();
    const packToUpdate = this.props.packs.filter(pack => pack.id === +evt.target.id.value)
    this.props.updatePack({
      id: +evt.target.id.value,
      name: evt.target.name.value,
    });
    this.closeEditModal();
  }

  openEditModal = () => {
    this.setState({ editModalOpen: true });
  }

  closeEditModal = () => {
    this.setState({ editModalOpen: false });
  };

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
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '50%',
      margin: '1em auto',
      textAlign: 'center',
    }
    return (
      <div style={divStyle}>
        <h1>All Flashcard Packs</h1>
        <br />
        <div>
          {packs.length ?
            packs.map(pack => {
              return (
                <div key={pack.id}>
                <Link to={`/packs/${pack.id}/flashcards`}>
                  <Card style={cardStyle}>
                    <Card.Content>
                      <Card.Header>{pack.name}</Card.Header>
                    </Card.Content>
                  </Card>
                </Link>
                <Modal trigger={<Button onClick={this.openEditModal}>Edit This Flashcard</Button>} open={this.state.editModalOpen}>
                  <Form onSubmit={this.editPackClick}>
                    <Modal.Content>
                      <Modal.Description>
                        Id: <Input name="id" value={pack.id} />
                        <br />
                        <br />
                        Name: <Input name="name" placeholder={pack.name} />
                        <br />
                        <br />
                      </Modal.Description>
                    </Modal.Content>
                    <Button type="submit" content="Submit" color="green"/>
                  </Form>
                </Modal>
                <Button value={pack.id} onClick={(evt) => this.deletePackClick(evt)}>Delete This Pack</Button>
                <br /><br />
                </div>
              )
            }) :
            null
          }
        </div>
        <Modal trigger={<Button onClick={this.openModal}>Add A New Pack</Button>} open={this.state.modalOpen}>
        <Form onSubmit={(evt) => this.submitNewPack(evt)}>
          <Modal.Content>
            <Modal.Description>
              Pack Name: <Input name="name" placeholder='Insert pack name here' />
              <br />
            </Modal.Description>
          </Modal.Content>
          <Button type="submit" content="Submit" color="green"/>
        </Form>
      </Modal>
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
    updatePack(pack) {
      dispatch(editPack(pack))
    }
  }
}

export default connect(mapState, mapDispatch)(AllPacks)
