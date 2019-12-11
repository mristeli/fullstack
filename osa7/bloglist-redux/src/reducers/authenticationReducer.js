const initialState = null

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: message,
      timeoutHandle: setTimeout(() => {
        dispatch({
          type : 'REMOVE_NOTIFICATION'
        })
      }, timeout * 1000)
    })
  }
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      
  case 'REMOVE_NOTIFICATION': 
    return ['', -1]
  default:
    return state
  }
}

export default authenticationReducer