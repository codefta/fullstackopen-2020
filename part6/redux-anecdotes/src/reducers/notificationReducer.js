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

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET_NOTIF',
      data: { message },
    })

    setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: null,
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
