import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { fetchPhotos } from './utils/CloudinaryService'
import { photosFetched } from './actions'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import cloud_name from './config/config'


const PhotoListContainer = () => {
 return <div>Photo List container</div>
}

const PhotosUploaderContainer = () => {
  return <div> Uploads Container </div>
}

class App extends Component {

  componentDidMount() {
    fetchPhotos(cloud_name).then(this.props.onPhotosFetched);
  }

  render() {
    return (
      <CloudinaryContext
                cloudName={cloud_name}
                uploadPreset={this.props.uploadPreset}
            >
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
                          <Redirect from="/" to="/photos" />
                      </Switch>

          </BrowserRouter>
      </CloudinaryContext>
    );
  }
}

export default connect(null,{ onPhotosFetched: photosFetched })(App);
