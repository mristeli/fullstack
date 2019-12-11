const initialState = ['', -1]

export const showError = (text, timeout = 5) =>
  showMessage(text, timeout, 'error')

export const showMessage = (text, timeout = 5, className = 'success') => 
  setNotification({
    text, className
  }, timeout)

export const removeMessage = () => {
  return async dispatch => {
    dispatch({ type: 'REMOVE_NOTIFICATION' })
  }
}

export const setNotification = (content, timeout) => {  
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
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