const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return action.data.message
    case 'RESET':
      return action.data
    default:
      return state
  }
}

export const addNotification = (message, timeout) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET_NOTIF',
      data: { message },
    })

    setTimeout(() => {
      removeNotification()
    }, timeout * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'RESET',
    data: null,
  }
}

export default notificationReducer
