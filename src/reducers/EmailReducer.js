import { SEND_EMAIL } from '../utils/Constants'

const EmailReducer = (emailResponse = {}, action) => {
  switch(action.type){
    case SEND_EMAIL: {
      return action.payload
    }
    default: {
      return emailResponse
    }
  }
}

export default EmailReducer