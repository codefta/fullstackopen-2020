const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return action.data.message
    case 'FAIL':
      return state
    case 'RESET':
      return action.data
    default:
      return state
  }
}

export const addNotification = (messageType, message) => {
  return {
    type: 'SUCCESS',
    data: { messageType, message },
  }
}

export const removeNotification = () => {
  return {
    type: 'RESET',
    data: null,
  }
}

export default notificationReducer
