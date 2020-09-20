import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import { Preloader } from '../shared'
import { getOneAlbum } from '../actions/api';
import { getPreviousAndNext } from '../utils';
import { PhotoCard } from './FullPhotoCard';

export function FullPhoto({ match }){
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  useEffect(()=>{
    const getData = async (id) => {
      const album = await getOneAlbum(id);
      if (album) {
        const sortedImages = album.images.sort((a, b) => a.sortPosition - b.sortPosition);
        setImages(sortedImages);
        const selectedImage = album.images.find(image => parseInt(image.id, 10) === parseInt(match.params.id, 10))
        if (selectedImage){
          setSelectedImage(selectedImage);
        }
        setIsLoading(false);
      }
    };
    const { albumId } = match.params;
    getData(albumId);
  }, []);

  const previousAndNext = getPreviousAndNext(images, match.params.id);
  return (
    <div>
      <Nav />
      {(isLoading || !selectedImage) ? 
        <Preloader /> 
          :
        <PhotoCard
            {...selectedImage}
            {...previousAndNext}
        />
      }
    </div>
  )
}
