const initialState = ['', -1]

export const showNotification = (message, removeHandle) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message,
    removeHandle
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': 
      return [action.data, action.removeHandle]
    case 'REMOVE_NOTIFICATION': 
      return ['', -1]
    default:
      return state
  }
}

export default notificationReducer