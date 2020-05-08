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

let timeoutId

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)
    await dispatch({
      type: 'SET_NOTIF',
      data: { message },
    })

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: null,
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
