const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return action.data.message
    case 'FAIL':
      return state
    default:
      return state
  }
}

export const addNotification = (message) => {
  return {
    type: 'SUCCESS',
    data: { message },
  }
}

export default notificationReducer
