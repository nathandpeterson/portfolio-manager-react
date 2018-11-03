import { GET_INFORMATION, UPDATE_INFORMATION, UPDATE_HOME_IMAGE } from '../utils/Constants'

const information = (information={}, action) => {
  switch (action.type) {
    case GET_INFORMATION:
      return action.payload
    case UPDATE_INFORMATION:
      return action.payload
    case UPDATE_HOME_IMAGE: 
      return action.payload
    default:
      return information
  }
}

export default information