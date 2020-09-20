
export const isFirstOrLastInAlbum = (images, id) => {
  if(!images || !images.length || !id) return {isFirst : true, isLast: true }
  const isFirst = parseInt(images[0].id, 10) === parseInt(id, 10)
  const isLast = parseInt(images[images.length - 1].id, 10) === parseInt(id, 10)
  return { isFirst, isLast }
}

const makeUrlForImage = (image) => {
  if (!image){
    return null
  }
  return `/${image.album_id}/${image.id}`
}

export const getPreviousAndNext = (sortedImages, id) => {
  let previousUrl = null;
  let nextUrl = null;
  for (let i = 0; i < sortedImages.length; i++) {
    if (sortedImages[i].id === Number(id)){
      previousUrl = makeUrlForImage(sortedImages[i - 1])
      nextUrl = makeUrlForImage(sortedImages[i + 1])
    }
  }
  return { previousUrl, nextUrl }
}
