import React, { useState, useEffect } from 'react'
const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState(null)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    const userLoad = blog.user
    if (userLoad) {
      setUser(userLoad)
    }
  }, [blog.user])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{user ? user.name : ''}</div>
      </div>
    </div>
  )
}

export default Blog
