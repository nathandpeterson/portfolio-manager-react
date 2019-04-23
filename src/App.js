import React, { Component } from 'react'
import { CloudinaryContext } from 'cloudinary-react'
//import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/App.css'
import { MetaHeaders } from './metaheaders/MetaHeaders'
// import PhotoCard from './components/PhotoCard'
// import Albums from './components/Albums'
// import Album from './components/Album'
// import AlbumForm from './components/Forms/AlbumForm'
// import ImageManager from './components/Forms/ImageManager'
// import { InitiateLogin } from './components/InitiateLogin'
// import EmailForm from './components/Forms/EmailForm'
// import Homepage from './components/Homepage'
// import AboutArtist from './components/AboutArtist'
// import SortAlbum from './components/SortAlbum'
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
