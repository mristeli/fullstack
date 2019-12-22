import blogService from '../services/blogs'

export const initializeAuthentication = () => {
  return async dispatch => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const setLoggedInUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))  
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const removeUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

const authenticationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export default authenticationReducer