import React, { useEffect, useState } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, addBlog } from './reducers/blogReducer'
import { failNotif, successNotif } from './reducers/notificationReducer'
import { loggedUser, emptyUser } from './reducers/userLoggedReducer'
import { initUsers } from './reducers/userReducer'

import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { Container, Menu, Button, Segment, Divider } from 'semantic-ui-react'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userLogged)
  const blogFormRef = React.createRef()
  const history = useHistory()
  const [activeMenu, setActiveMenu] = useState('home')

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loggedUser(user))
      history.push('/')
    } catch (exception) {
      dispatch(failNotif(exception.response.data.error, 5))
    }
  }

  const handleLogout = async () => {
    await window.localStorage.removeItem('loggedBloglistappUser')
    dispatch(emptyUser())
  }

  const handleAddBlog = async ({ title, author, url }) => {
    try {
      const blog = {
        title,
        author,
        url,
      }

      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blog))

      dispatch(successNotif(`a new blog ${title} by ${blog.author} added`, 5))
    } catch (exception) {
      dispatch(failNotif(exception.response.data.error, 5))
    }
  }

  if (user === null) {
    return (
      <div>
        {user === null ? <Redirect to="/login" /> : <Redirect to="/" />}
        <Route path="/login">
          <Notification />
          <Login login={handleLogin} />
        </Route>
      </div>
    )
  }

  return (
    <div>
      <Container fluid>
        <Segment inverted primary="true">
          <Menu inverted pointing secondary>
            <Menu.Item as="h3" name="Blogs App" />
            <Menu.Item
              as={Link}
              name="home"
              to="/"
              active={activeMenu === 'home'}
              onClick={() => setActiveMenu('home')}
            />
            <Menu.Item
              as={Link}
              name="user"
              to="/users"
              active={activeMenu === 'users'}
              onClick={() => setActiveMenu('users')}
            />
            <Menu.Menu position="right">
              <Menu.Item as="div" name={user.name} />
              <Menu.Item>
                <Button onClick={handleLogout}>Logout</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>

        <Notification />
        <Container>
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/users">
              {user === null && <Redirect to="/login" />}
              <Users />
            </Route>
            <Route path="/">
              {user === null && <Redirect to="/login" />}
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={handleAddBlog} />
              </Togglable>
              <Divider />
              <BlogList />
            </Route>
          </Switch>
        </Container>
      </Container>
    </div>
  )
}

export default App
