import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [messageType, setMessageType] = useState('')
  const [message, setMessage] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(exception.response.data.error)
      setMessageType('error')

      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    await window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const Blog = {
        title,
        author,
        url,
      }

      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(Blog)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${newBlog.author} added`)
      setMessageType('success')

      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    } catch (exception) {
      setMessage(exception.response.data.error)
      setMessageType('error')

      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification messageType={messageType} message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              name="Username"
              value={username}
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              name="Password"
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification messageType={messageType} message={message} />
      {user !== null && (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          handleSubmit={handleAddBlog}
          handleChangeTitle={({ target }) => setTitle(target.value)}
          handleChangeAuthor={({ target }) => setAuthor(target.value)}
          handleChangeUrl={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
