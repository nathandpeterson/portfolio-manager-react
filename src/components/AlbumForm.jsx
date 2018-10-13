import React, { Component } from 'react'
import { Row, Col, Input, Button } from 'react-materialize'
import Nav from './Nav'
import { Image } from 'react-materialize'
import { openUploadWidget } from '../utils/CloudinaryService'

class AlbumForm extends Component {

  constructor(){
    super()

    this.state = {
      album_name: '',
      album_description: '',
      photos: []
    }
  }

  handleUpload = (e) => {
    if(e) {
      console.log('file', e.target.value)
    }
  }

  renderThumbnail = (photo) => {
    return (
      <Image publicId={photo} width='75px'/>
    )
  }

  render(){
    console.log('this state', this.state)
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
              <Input        waves='light'
                            label='Add Photo'
                            type='file'
                            onChange={(e) => this.handleUpload(e)} />            
          </Col>
        </Row>
        <Row>
          <Col s={10}></Col>
          <Col s={1}>
            <Button   large 
                      className='#80deea cyan lighten-1' 
                      waves='light'
                      id="upload_widget_opener"
                      onClick={() => openUploadWidget()}>
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

export default AlbumForm