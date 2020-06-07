import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userLoggedReducer from './reducers/userLoggedReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  userLogged: userLoggedReducer,
  users: userReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
