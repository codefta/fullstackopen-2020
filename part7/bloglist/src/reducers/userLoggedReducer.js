const userLoggedReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGGED_USER':
      return action.data
    case 'EMPTY_USER':
      return null
    default:
      return state
  }
}

export const loggedUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGGED_USER',
      data: user,
    })
  }
}

export const emptyUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'EMPTY_USER',
    })
  }
}

export default userLoggedReducer
