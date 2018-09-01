import C from '../utils/constants'

const authedUser = (state = 'johndoe', action) => {
  switch (action.type) {
    case C.AUTH_USER:
      return action.userId
    default:
      return state
  }
}
export default authedUser