import { GENERATE_SORT_LIST, UPDATE_SORT_LIST } from '../utils/Constants'

const sortList = (sortList=[], action) => {
  switch (action.type) {    
    case GENERATE_SORT_LIST:
      return action.images
    case UPDATE_SORT_LIST: {
      return action.images
    }
    default:
      return sortList
  }
}

export default sortList