import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Albums from './Albums'
import Album from './Album'
import AlbumForm from './Forms/AlbumForm'
import ImageManager from './Forms/ImageManager'
import { InitiateLogin } from './InitiateLogin'
import EmailForm from './Forms/EmailForm'
import Homepage from './Homepage'
import AboutArtist from './AboutArtist'
import SortAlbum from './SortAlbum'
import { FullPhoto } from './FullPhoto';

export const Router = () => (
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
                component={FullPhoto} />
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
)
