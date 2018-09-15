import React from 'react'
import {connect} from 'react-redux'
import {updateThisFlashcard} from '../../store'
import {Button, Modal, Form, TextArea, Label, Input} from 'semantic-ui-react'

class EditFlashcard extends React.Component {
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

  editThisFlashcard = (evt) => {
    evt.preventDefault();
    this.props.updateFlashcard({
      id: +evt.target.id.value,
      question: evt.target.question.value,
      answer: evt.target.answer.value,
      type: this.props.flashcard.type
    });
    this.closeEditModal();
  }

  render() {
    const {flashcard} = this.props
    return (
      <div>
      {flashcard ?
      <div>
        <Modal trigger={<Button color="blue" onClick={this.openEditModal}>Edit This Flashcard</Button>} open={this.state.editModalOpen}>
          <Modal.Header>Edit The Below Question & Answer</Modal.Header>
          <Form onSubmit={this.editThisFlashcard}>
            <Modal.Content>
              <Modal.Description>
                <Label>Id:</Label>
                <Input name="id" value={this.props.flashcard.id} />
                <br />
                <br />
                <Label>Edit The Below Question</Label>
                <TextArea name="question" placeholder={this.props.flashcard.question} />
                <br />
                <br />
                <Label>Edit The Below Answer</Label>
                <TextArea name="answer" placeholder={this.props.flashcard.answer} />
              </Modal.Description>
              <br /><br />
              <Button  type="submit" content="Submit" color="green"/>
            </Modal.Content>
          </Form>
        </Modal>
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

const mapDispatch = dispatch => {
  return {
    updateFlashcard(flashcard) {
      dispatch(updateThisFlashcard(flashcard))
    }
  }
}

export default connect(null, mapDispatch)(EditFlashcard)
