import React from 'react'
import {connect} from 'react-redux'
import {editPack} from '../../store'
import {Button, Modal, Form, Input} from 'semantic-ui-react'

class EditPack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editModalOpen: false
    }
  }

  openEditModal = () => {
    this.setState({ editModalOpen: true });
  }

  closeEditModal = () => {
    this.setState({ editModalOpen: false });
  };

  editPackClick = (evt) => {
    evt.preventDefault();
    this.props.updatePack({
      id: +evt.target.id.value,
      name: evt.target.name.value,
    });
    this.closeEditModal();
  }

  render() {
    return (
      <div>
        <Modal trigger={<Button color= "blue" onClick={this.openEditModal}>Edit This Pack</Button>} open={this.state.editModalOpen}>
          <Form onSubmit={(evt) => this.editPackClick(evt)}>
            <Modal.Content>
              <Modal.Description>
                Id: <Input name="id" value={this.props.pack.id} />
                <br />
                <br />
                Name: <Input name="name" placeholder={this.props.pack.name} />
                <br />
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
    updatePack(pack) {
      dispatch(editPack(pack))
    }
  }
}

export default connect(null, mapDispatch)(EditPack)
