import React, { Component } from 'react'
import { Row, Col, Input, Button } from 'react-materialize'
import Nav from './Nav'
import { Image } from 'react-materialize'
import Dropzone from 'react-dropzone'
import { cloud_name, upload_preset } from '../config/config'
import { uploadWidget } from '../data/utilities'
import { uploadImageName } from '../actions'
import { connect } from 'react-redux'


class AlbumForm extends Component {

  constructor(){
    super()

    this.state = {
      album_name: '',
      album_description: '',
      photos: []
    }
  }

  // handleDrop = (files) => {
  //   const uploads = files.map(file => {

  //     const upload = {
  //       file,
  //       tags: this.state.album_name,
  //       upload_preset
  //     }

  //     return axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
  //       upload, {headers: { "X-Requested-With": "XMLHttpRequest" }})
  //     .then(response => {
  //         const {data} = response;
  //         // const fileURL = data.secure_url // You should store this URL for future references in your app
  //         console.log(data);
  //       })
  //   })
    
  //   return axios.all(uploads).then((returnAll) => {
  //     console.log('returnAll', returnAll)
  //     // ... perform after upload is successful operation
  //   });
  // }

  renderThumbnail = (photo) => {
    return (
      <Image publicId={photo} width='75px'/>
    )
  }

  handleUpload = (imageName) => {
    this.props.uploadImageName(imageName)
  }

  render(){
    return (
      <div>
        <Nav />
        <br />
        <Row>
          <Col s={3}/>
          <Input 
                  s={6}
                  onChange={(e) => this.setState({album_name: e.target.value})}
                  placeholder={'Year or Theme'}
                  label={'Album Name'}/>
        </Row>
        <Row>
          <Col s={3}/>
          <Input  label={'Album Description'} 
                  s={6}
                  onChange={(e) => this.setState({album_description: e.target.value})}
                  placeholder='You are not required to write a description.'  
                  type='textarea' />
        </Row>
        
        <Row>
          <Col s={4}/>
          <Col s={6}>
          {/* <Dropzone 
              onDrop={this.handleDrop} 
              multiple 
              accept="image/*"
              // style={{"width" : "100%", "height" : "20%", "border" : "1px solid black"}} 
            >
              <p>Drop your files or click here to upload</p>
            </Dropzone>          */}
          </Col>
        </Row>
        <Row>
          <Col s={10}></Col>
          <Col s={1}>
            <Button   large 
                      className='#80deea cyan lighten-1' 
                      waves='light'
                      id="upload_widget_opener"
                      onClick={() => {
                        window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
                          (error, result) => {
                              this.handleUpload(result)
                          });
                        }
                        }>
                  SAVE
              </Button>
          </Col>
        </Row>
        
        
        <Row>
          {this.state.photos.map(this.renderThumbnail)}
        </Row>
         
        
      </div>
    )
  }
}

export default connect(null, { uploadImageName })(AlbumForm)