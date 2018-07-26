import React from 'react'
import {connect} from 'react-redux'
import {postFlashcard} from '../store'
import {Button, Modal, Form, Input} from 'semantic-ui-react'

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
    console.log('pack in here ', this.props.pack);
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
      <Modal trigger={<Button onClick={this.openModal}>Add A New Flashcard</Button>} open={this.state.modalOpen}>
        <Form onSubmit={this.submitNewFlashcard}>
          <Modal.Content>
            <Modal.Description>
              Question: <Input name="question" placeholder='Insert question here' />
              <br />
              Answer: <Input name="answer" placeholder='Answer' />
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
