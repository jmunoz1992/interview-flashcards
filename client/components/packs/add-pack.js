import React from 'react'
import {connect} from 'react-redux'
import {postPack} from '../../store'
import {Button, Modal, Form, Input} from 'semantic-ui-react'

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

const mapDispatch = dispatch => {
  return {
    addPack(pack) {
      dispatch(postPack(pack))
    },
  }
}

export default connect(null, mapDispatch)(AddPack)
