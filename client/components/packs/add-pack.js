import React from 'react'
import {connect} from 'react-redux'
import {postPack} from '../../store'
import {Button, Modal, Form, Input, Label} from 'semantic-ui-react'

class AddPack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
    }
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

  render() {
    return (
      <div>
        <Modal trigger={<Button color="green" onClick={this.openModal}>Add A New Pack</Button>} open={this.state.modalOpen}>
          <Modal.Header>Add A New Pack</Modal.Header>
          <Form onSubmit={(evt) => this.submitNewPack(evt)}>
            <Modal.Content>
              <Modal.Description>
                <Label>Pack Name:</Label>
                <Input name="name" placeholder='Insert pack name here' />
                <br />
              </Modal.Description>
              <br /><br />
              <Button type="submit" content="Submit" color="green"/>
            </Modal.Content>
          </Form>
        </Modal>
      </div>
    )
  }

}

/**
 * CONTAINER
 */

const mapDispatch = dispatch => {
  return {
    addPack(pack) {
      dispatch(postPack(pack))
    },
  }
}

export default connect(null, mapDispatch)(AddPack)
