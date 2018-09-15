import React from 'react'
import {connect} from 'react-redux'
import {postFlashcard} from '../../store'
import {Button, Modal, Form, TextArea, Label} from 'semantic-ui-react'

class AddFlashcard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
    }
  }

  submitNewFlashcard = (evt) => {
    evt.preventDefault();
    const question = evt.target.question.value;
    const answer = evt.target.answer.value;
    const type = this.props.pack.name;
    this.props.addFlashcard({
      question,
      answer,
      type
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
      <Modal trigger={<Button color="green" onClick={this.openModal}>Add A New Flashcard</Button>} open={this.state.modalOpen}>
        <Modal.Header>Please Add A Question & Answer</Modal.Header>
        <Form onSubmit={this.submitNewFlashcard}>
          <Modal.Content>
            <Modal.Description>
              <Label>Insert Question Below:</Label>
              <TextArea name="question" placeholder='Insert question here' />
              <br /><br />
              <Label>Insert Answer Below:</Label>
              <TextArea name="answer" placeholder='Insert answer here' />
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

const mapState = state => {
  const packNum = +(window.location.pathname.split('/')[2]);
  const pack = state.packs.filter(thisPack => thisPack.id === packNum)[0];
  return {
    pack
  }
}

const mapDispatch = dispatch => {
  return {
    addFlashcard(flashcard) {
      dispatch(postFlashcard(flashcard))
    },
  }
}

export default connect(mapState, mapDispatch)(AddFlashcard)
