import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import Nav from './Nav'
import Overdrive from 'react-overdrive'
import { Link, withRouter } from 'react-router-dom'
import { fetchOneAlbum } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const photoArray = [
  {id: 1, key: 'rawls/rawls-001'}, 
  {id: 2, key: 'rawls/rawls-002'},
  {id: 3, key: "test-upload/cb12pqhuhx9bpafa0dwp"}
]

class Album extends Component {

  // componentDidMount(){
  //   const { id } = this.props.match.params
  //   fetchOneAlbum(id)
  // }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Nav />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
          {photoArray.map(({ key, id }) => (
            <div key={key} style={{ padding: '1rem' }}>
              <Overdrive id={key}>
                <Link to={`/photos/${id}`} >
                  <Image publicId={key} width='150px' />
                </Link>
              </Overdrive>
            </div>
          )
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { album: state.albums }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchOneAlbum}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album))