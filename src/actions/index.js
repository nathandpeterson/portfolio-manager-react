import axios from 'axios'

import {
  FETCH_ALBUMS, FETCH_ONE_ALBUM,
  UPLOAD_IMAGE_NAME, DELETE_IMAGE,
  SAVE_ALBUM, UPDATE_ALBUM,
  SEND_EMAIL,DELETE_ALBUM,
  GET_INFORMATION, UPDATE_INFORMATION,
  UPDATE_HOME_IMAGE,
  GENERATE_SORT_LIST, UPDATE_SORT_LIST, SAVE_SORT_LIST
} from '../utils/Constants'

const SERVER = process.env.REACT_APP_SERVER || '/api'

const HEADERS = {"Content-Type": "application/json"}

export const getInformation = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${SERVER}/information`)
    const first = data.find(info => info.id === 1)
    dispatch({
      type: GET_INFORMATION,
      payload: first
    })
  }
}

export const updateInformation = (updatedInformation, cb) => {
  const token = localStorage.getItem('token')
  return async (dispatch, getState) => {
    const { information } = getState()
    const { data } = await axios.post(`${SERVER}/information`, 
          {...information, ...updatedInformation}, {headers: { ...HEADERS, token }
        })
    dispatch({
      type: UPDATE_INFORMATION,
      payload: data
    })
    cb ? cb() : console.log('no callback')
  }
} 

export const updateHomeImage = (imageId, cb) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      const { information } = getState()
      const { data } = await axios.post(`${SERVER}/information`, 
            {...information, homepage_image: imageId}, {headers: { ...HEADERS, token }
          })
      dispatch({
        type: UPDATE_HOME_IMAGE,
        payload: data
      })
      cb ? cb() : console.log('no callback')
    }
} 

export const uploadImageName = (imageData, cb) => {
  const token = localStorage.getItem('token')
  const { id } = imageData
 
  const postURL = id ? `${SERVER}/images/${id}` : `${SERVER}/images`
  return async (dispatch) => {
    let { data } = await axios.post(postURL, 
      {...imageData}, 
      {headers: { ...HEADERS, token }}
      )
    // when updating an existing image, server responds with correct data
    // when adding a new image, imageData is nested as the imageData key on response
    if(data.imageData) {
      data = imageData
    }
    dispatch({
      type: UPLOAD_IMAGE_NAME,
      payload : data
    })

    cb ? cb('Success!') : console.log('no callback')
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
  cb ? cb('Image Successfully Deleted') : console.log('no callback')
  }
}

export const saveSortOrder = (imageArray, cb) => {
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/albumImages`, imageArray, 
    {headers: { ...HEADERS, token }} )
  dispatch({
    type: SAVE_SORT_LIST,
    payload : data
  })
  cb ? cb() : console.log('no callback')
}
}

export const updateSortOrder = (images) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SORT_LIST,
      images
    })
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

export const fetchOneAlbum = (albumId, sortList=false) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${SERVER}/albums/${albumId}`)
    dispatch({
      type: FETCH_ONE_ALBUM,
      payload: data
    })
    if(sortList){
      dispatch({
        type: GENERATE_SORT_LIST,
        images: data.images
      })
    }
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
