import React from 'react'
import {connect} from 'react-redux'
import {fetchPacks} from '../store'
import {Card} from 'semantic-ui-react'
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
                <Link to={`/packs/${pack.id}/flashcards`} key={pack.id}>
                  <Card style={cardStyle}>
                    <Card.Content>
                      <Card.Header>{pack.name}</Card.Header>
                    </Card.Content>
                  </Card>
                </Link>
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
    }
  }
}

export default connect(mapState, mapDispatch)(AllPacks)
