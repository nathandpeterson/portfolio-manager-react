import axios from 'axios'

import {
  FETCH_ALBUMS,
  FETCH_ONE_ALBUM,
  SET_SELECTED_PHOTO,
  UPLOAD_IMAGE_NAME,
  SAVE_ALBUM,
  SEND_EMAIL
} from '../utils/Constants'

const SERVER = process.env.SERVER || 'http://localhost:4000/api'


export const setSelectedPhoto = photoData => {
  return {
    type: SET_SELECTED_PHOTO,
    photoData
  }
}

export const uploadImageName = (imageData, cb) => {
  const { id } = imageData
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/images${id ? '/' + id : ''}`, {...imageData})
    dispatch({
      type: UPLOAD_IMAGE_NAME,
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
  return async (dispatch) => {
    const { data } = await axios.get(`${SERVER}/albums/${albumId}`)

    dispatch({
      type: FETCH_ONE_ALBUM,
      payload: data
    })
  }
}

export const saveAlbum = (albumData) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/albums`, albumData)
    dispatch({
      type: SAVE_ALBUM,
      payload: data
    })
  }
}

export const sendEmail = (emailData) => {
  console.log('emailData', emailData)
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/contact`, emailData)
    console.log('response', data)
    dispatch({
      type: SEND_EMAIL,
      payload: data
    })
  }
}
