import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { fetchPhotos } from './utils/CloudinaryService'
import { photosFetched } from './actions'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import {cloud_name, upload_preset} from './config/config'
import {Row, Col, Input, Button} from 'react-materialize'
import GroupThumbnails from './components/GroupThumbnails'
import PhotoCard from './components/PhotoCard'
import Nav from './components/Nav'

const photoArray = [{key: 'rawls/rawls-001'}, {key: 'rawls/rawls-002'}]

const uploadWidget = () => {
  window.cloudinary.openUploadWidget({ cloud_name, upload_preset},
      function(error, result) {
          console.log(result);
      });
}

const PhotosUploaderContainer = () => {
  return <div> Uploads Container </div>
}

const Manager = ( ) => {

  return (
    <div>
      Manager
      <Row>
        <Col s={12}>
          <Input  label='UPLOAD' 
                  id='file-picker' 
                  type='file'
                  placeholder='Choose A File'
                  onChange={(e) => console.log(e.target.value)} />
        </Col>
  
      </Row>
      <Row>
        <Col sm={12}>
            <Button floating 
                    large 
                    className='grey' 
                    waves='light' 
                    icon='add'
                    id="upload_widget_opener"
                    onClick={uploadWidget} />
        </Col>
      </Row>
      
    </div>
  )
}

class App extends Component {
  async componentDidMount() {
    const result = await fetchPhotos(cloud_name)
  }

  render() {
    return (
      <CloudinaryContext cloudName={cloud_name}>
        <div style={{display:'flex', justifyContent: 'center'}}>
            <Nav />
        </div>
        <BrowserRouter>
          <Switch className="router">
                          <Route
                              exact
                              path="/photos"
                              component={GroupThumbnails}
                          />
                          <Route
                              exact
                              path="/photos/:id"
                              component={PhotoCard}
                          />
                          <Route
                              exact
                              path="/photos/new"
                              component={PhotosUploaderContainer}
                          />
                          <Route exact path="/manage" component={Manager} />
                          <Redirect from="/" to="/photos" />
                      </Switch>

          </BrowserRouter>
      </CloudinaryContext>
    );
  }
}

export default App
