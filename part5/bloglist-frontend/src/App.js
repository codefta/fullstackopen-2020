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

  const handleAddBlog = async ({ title, author, url }) => {
    // event.preventDefault()

    try {
      const Blog = {
        title,
        author,
        url,
      }

      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(Blog)
      setBlogs(blogs.concat(newBlog))
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

  const handleLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    const object = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    try {
      const updatedBlog = await blogService.update(id, object)

      setBlogs(blogs.map((b) => (b.id === id ? updatedBlog : b)))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id)

        setBlogs(blogs.filter((b) => b.id !== id))
        setMessage(`blog ${blog.title} by ${blog.author} deleted`)
        setMessageType('success')

        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      } catch (exception) {
        console.log(exception)
      }
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
              id="username"
              name="Username"
              value={username}
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              name="Password"
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
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
        <BlogForm createBlog={handleAddBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
