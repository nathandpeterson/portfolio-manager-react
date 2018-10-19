import {
  PHOTOS_FETCHED,
  PHOTOS_UPLOADED,
  DELETE_UPLOADED_PHOTO,
  UPDATE_UPLOADED_PHOTO,
  SET_SELECTED_PHOTO,
  UPLOAD_IMAGE_NAME
} from '../utils/Constants'
import axios from 'axios'

export const photosFetched = photos => ({
  type: PHOTOS_FETCHED,
  photos: photos,
});

export const photosUploaded = photos => ({
  type: PHOTOS_UPLOADED,
  photos: photos,
});

export const updateUploadedPhoto = uploadedPhoto => ({
  type: UPDATE_UPLOADED_PHOTO,
  uploadedPhoto: uploadedPhoto,
});

export const deleteUploadedPhoto = publicId => ({
  type: DELETE_UPLOADED_PHOTO,
  publicId: publicId,
});

export const setSelectedPhoto = photoData => {
  type: SET_SELECTED_PHOTO
}

export const uploadImageName = cloudinaryResponse => {
  console.log('imageName', cloudinaryResponse)
  return async (dispatch) => {
    const { data } = await axios.post(`http://localhost:4000/api/images`, {cloudinaryResponse})
    dispatch({
      type: UPLOAD_IMAGE_NAME,
      payload : data
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