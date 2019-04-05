import React, { Component } from 'react'
import { CloudinaryContext } from 'cloudinary-react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/App.css'
import { MetaHeaders } from './metaheaders/MetaHeaders'
import PhotoCard from './components/PhotoCard'
import Albums from './components/Albums'
import Album from './components/Album'
import AlbumForm from './components/Forms/AlbumForm'
import ImageManager from './components/Forms/ImageManager'
import { InitiateLogin } from './components/InitiateLogin'
import EmailForm from './components/Forms/EmailForm'
import Homepage from './components/Homepage'
import AboutArtist from './components/AboutArtist'
import SortAlbum from './components/SortAlbum'
import './styles/materialize-src/sass/materialize.scss'

const cloud_name = process.env.REACT_APP_CLOUD_NAME

class App extends Component {

  render() {
    return (
      <CloudinaryContext cloudName={cloud_name} >
        <MetaHeaders />
        <BrowserRouter>
          <Switch className="router">
            <Route exact 
                  path='/login' 
                  component={InitiateLogin}/>
            <Route
                exact
                path="/collections/new"
                component={AlbumForm}
              />
            <Route
                exact
                path="/contact"
                component={EmailForm}  />
            <Route
                exact
                path="/collections/:id"
                component={Album} />
            <Route
                exact
                path="/collections"
                component={Albums} />             
            <Route
                exact
                path="/:albumId/:id"
                component={PhotoCard} />
            <Route
                exact
                path="/collections/:id/manageCollection"
                component={AlbumForm} />
            <Route
                exact
                path="/"
                component={Homepage} />
            <Route
                exact
                path="/collections/:id/manageImages"
                component={ImageManager}  />
            <Route
                exact
                path="/collections/:id/sortImages"
                component={SortAlbum}  />   
            <Route
                exact
                path='/about'
                component={AboutArtist} />
          </Switch>
        </BrowserRouter>        
      </CloudinaryContext>
    );
  }
}

export default App
