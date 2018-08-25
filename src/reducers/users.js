import C from '../utils/constants'

const users = (state = {}, action) => {
  switch (action.type) {
    case C.RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    default:
      return state
  }
}
export default users