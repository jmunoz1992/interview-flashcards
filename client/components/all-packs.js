import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks, deletePack} from '../store'
import {Card, Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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

  editPackClick = (evt) => {
    console.log('edit this pack thooo: ', evt.target.value)
  }

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
                <Button value={pack.id} onClick={(evt) => this.editPackClick(evt)}>Edit This Pack</Button>
                <Button value={pack.id} onClick={(evt) => this.deletePackClick(evt)}>Delete This Pack</Button>
                <br /><br />
                </div>
              )
            }) :
            null
          }
        </div>
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
  }
}

export default connect(mapState, mapDispatch)(AllPacks)
