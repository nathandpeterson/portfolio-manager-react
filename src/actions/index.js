import axios from 'axios'

import {
  FETCH_ALBUMS,
  FETCH_ONE_ALBUM,
  SET_SELECTED_PHOTO,
  UPLOAD_IMAGE_NAME
} from '../utils/Constants'

const SERVER = process.env.SERVER || 'http://localhost:4000/api'


export const setSelectedPhoto = photoData => {
  return {
    type: SET_SELECTED_PHOTO,
    photoData
  }
}

export const uploadImageName = cloudinaryResponse => {
  return async (dispatch) => {
    const { data } = await axios.post(`${SERVER}/images`, {cloudinaryResponse})
    dispatch({
      type: UPLOAD_IMAGE_NAME,
      payload : data
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

export const fetchOneAlbum = (albumId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${SERVER}/albums/${albumId}`)
    dispatch({
      type: FETCH_ONE_ALBUM,
      payload: data
    })
  }
}


// export function fetchBlogPost(blogPostId){
//   return async (dispatch) => {
//     const res = await request(`/api/blogposts/${blogPostId}`)
//     const json = await res.json()

//     dispatch({
//       type: FETCH_BLOG_POST_SUCCESS,
//       payload: json.BlogPost
//     })
//   }
// }