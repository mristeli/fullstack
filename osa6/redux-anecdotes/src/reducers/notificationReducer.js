const initialState = ['', -1]

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
      timeoutHandle: setTimeout(() => {
        dispatch({
          type : 'REMOVE_NOTIFICATION'
        })
      }, timeout * 1000)
    })
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const [, timeoutHandle] = state
      clearTimeout(timeoutHandle)
      return [action.data, action.timeoutHandle]
    case 'REMOVE_NOTIFICATION': 
      return ['', -1]
    default:
      return state
  }
}

export default notificationReducer