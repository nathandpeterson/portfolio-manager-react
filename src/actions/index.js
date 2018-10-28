import axios from 'axios'

import {
  FETCH_ALBUMS,
  FETCH_ONE_ALBUM,
  SET_SELECTED_PHOTO,
  UPLOAD_IMAGE_NAME,
  DELETE_IMAGE,
  SAVE_ALBUM,
  UPDATE_ALBUM,
  SEND_EMAIL,
  DELETE_ALBUM
} from '../utils/Constants'

const SERVER = process.env.SERVER || 'http://localhost:4000/api'

const HEADERS = {"Content-Type": "application/json"}

export const setSelectedPhoto = photoData => {
  return {
    type: SET_SELECTED_PHOTO,
    photoData
  }
}

export const uploadImageName = (imageData, cb) => {
  const token = localStorage.getItem('token')
  const { id } = imageData
  const postURL = id ? `${SERVER}/images/${id}` : `${SERVER}/images`
  return async (dispatch) => {
    const { data } = await axios.post(postURL, 
      {...imageData}, {headers: { ...HEADERS, token }} )
    dispatch({
      type: UPLOAD_IMAGE_NAME,
      payload : data
    })

    cb ? cb() : console.log('no callback')
  }
}

export const deleteImage = (imageId, cb) => {
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    const { data } = await axios.delete(`${SERVER}/images/${imageId}`, 
    {headers: { ...HEADERS, token }} )
  dispatch({
    type: DELETE_IMAGE,
    payload : data
  })
  cb ? cb() : console.log('no callback')
  }
}

export const fetchAlbums = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${SERVER}/albums`)
    dispatch({
      type: FETCH_ALBUMS,
      payload: data
    })
  }
}

export const fetchOneAlbum = (albumId) => {
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    const { data } = await axios.get(`${SERVER}/albums/${albumId}`)

    dispatch({
      type: FETCH_ONE_ALBUM,
      payload: data
    })
  }
}

export const saveAlbum = (albumData) => {
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/albums`, albumData,  {headers: { ...HEADERS, token }})
    dispatch({
      type: SAVE_ALBUM,
      payload: data
    })
  }
}


export const updateAlbum = (albumData) => {
  const token = localStorage.getItem('token')
  const { id } = albumData
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/albums/${id}`, 
                                      albumData, 
                                      {headers: { ...HEADERS, token }}
                                      )
    dispatch({
      type: UPDATE_ALBUM,
      payload: data
    })
  }
}

export const deleteAlbum = (albumId, cb) => {
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    const { data } = await axios.delete(`${SERVER}/albums/${albumId}`, 
    {headers: { ...HEADERS, token }} )
  dispatch({
    type: DELETE_ALBUM,
    payload : data
  })
  cb ? cb() : console.log('no callback')
  }
}

export const sendEmail = (emailData) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/contact`, emailData)
    dispatch({
      type: SEND_EMAIL,
      payload: data
    })
  }
}
