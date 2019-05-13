import React, { Component } from 'react'
import { CloudinaryContext } from 'cloudinary-react'
import './styles/App.css'
import './styles/Album.scss'
import { MetaHeaders } from './metaheaders/MetaHeaders'
import 'materialize-css/dist/css/materialize.min.css'
import { Router } from './components/Router'

const cloud_name = process.env.REACT_APP_CLOUD_NAME

class App extends Component {

  render() {
    return (
      <CloudinaryContext cloudName={cloud_name} >
        <MetaHeaders />
        <Router  />      
      </CloudinaryContext>
    );
  }
}

export default App
