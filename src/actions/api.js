import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER || '/api';

export async function getOneAlbum(albumId){
  try {
    const { data } = await axios.get(`${SERVER}/albums/${albumId}`);
    return data;
  } catch (e) {
    // TODO log here
    console.log('something went wrong', e);
  } 
}