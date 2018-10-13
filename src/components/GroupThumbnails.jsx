import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import Nav from './Nav'
import Overdrive from 'react-overdrive'
import {Link} from 'react-router-dom'

const photoArray = [
  {id: 1, key: 'rawls/rawls-001'}, 
  {id: 2, key: 'rawls/rawls-002'},
  {id: 3, key: "test-upload/cb12pqhuhx9bpafa0dwp"}
]

class GroupThumbnails extends Component {

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

export default GroupThumbnails