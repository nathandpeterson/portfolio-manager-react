import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import Overdrive from 'react-overdrive'
import {Link} from 'react-router-dom'
import {setSelectedPhoto} from '../actions'
import {connect} from 'react-redux'

const photoArray = [
  {id: 1, key: 'rawls/rawls-001'}, 
  {id: 2, key: 'rawls/rawls-002'},
  {id: 3, key: "test-upload/cb12pqhuhx9bpafa0dwp"}
]

class GroupThumbnails extends Component {

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',         
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>
        {photoArray.map(({ key, id }) => (
          <div key={key} style={{ padding: '1rem'  }}>
            <Overdrive id={key}>
              <Link to={`/photos/${id}`} onClick={(e) => this.props.setSelectedPhoto({key, id})}>
                <Image publicId={key} width='150px' />
              </Link>
            </Overdrive>
          </div>
          )
        )}
      </div>
    )
  }
}

export default connect(null, {setSelectedPhoto})(GroupThumbnails)