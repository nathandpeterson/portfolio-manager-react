import React, { Component } from 'react'
import { Button, Row, Col } from 'react-materialize'
import {cloud_name, upload_preset} from '../config/config'
import Nav from './Nav'

class AddPhoto extends Component {

  uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
        function(error, result) {
            console.log(result);
        });
  }

  render () {
    return (
    <div>
      <Nav />
      <br />
      <div className='heading flex-center'>
        Add a photo
      </div>
      <br />
      <div className='flex-center'>
        <Button     large 
                    className='#80deea cyan lighten-3' 
                    waves='light' 
                    icon='add'
                    id="upload_widget_opener"
                    onClick={this.uploadWidget} />
      </div>
    </div>
    )
  }
}

export default AddPhoto