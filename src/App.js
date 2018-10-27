import React, { Component } from 'react'
import { CloudinaryContext } from 'cloudinary-react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import { cloud_name } from './config/config'
import PhotoCard from './components/PhotoCard'
import Albums from './components/Albums'
import Album from './components/Album'
import AlbumForm from './components/Forms/AlbumForm'
import ImageManager from './components/Forms/ImageManager'
import InitiateLogin from './components/InitiateLogin'
import EmailForm from './components/Forms/EmailForm'

class App extends Component {

  render() {
  
    return (
      <CloudinaryContext cloudName={cloud_name}>
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
                path="/:id"
                component={Album} />
            <Route
                exact
                path="/"
                component={Albums} />           
            <Route
                exact
                path="/:albumId/:id"
                component={PhotoCard} />
            <Route
                exact
                path="/collections/:id/manageImages"
                component={ImageManager}  />
            <Route
                exact
                path="/email"
                component={EmailForm}  />
            <Redirect from="/" to="/" />
          </Switch>
        </BrowserRouter>        
      </CloudinaryContext>
    );
  }
}

export default App
