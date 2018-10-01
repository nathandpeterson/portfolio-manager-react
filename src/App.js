import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { fetchPhotos } from './utils/CloudinaryService'
import { photosFetched } from './actions'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import config from './config/config'
import {Row, Col, Input} from 'react-materialize'


const PhotoListContainer = () => {
 return <Image publicId="computer-min.jpg" width='100%' >

 </Image>
}

const PhotosUploaderContainer = () => {
  return <div> Uploads Container </div>
}

const Manager = () => {

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
      
    </div>
  )
}

class App extends Component {

  render() {
    return (
      <CloudinaryContext cloudName={config.cloud_name}>
        <div>Henry Proust

        </div>
        <BrowserRouter>
          <Switch className="router">
                          <Route
                              exact
                              path="/photos"
                              component={PhotoListContainer}
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
