const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        type: 'success',
        message: action.data.message,
      }
    case 'FAIL':
      return {
        type: 'fail',
        message: action.data.message,
      }
    case 'RESET':
      return null
    default:
      return state
  }
}

export const successNotif = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SUCCESS',
      data: { message },
    })

    setTimeout(() => {
      dispatch(removeNotif())
    }, timeout * 1000)
  }
}

export const failNotif = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'FAIL',
      data: { message },
    })

    setTimeout(() => {
      dispatch(removeNotif())
    }, timeout * 1000)
  }
}

const removeNotif = () => {
  return { type: 'RESET' }
}

export default notificationReducer
