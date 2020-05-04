import React, { useState } from 'react'
const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteButton = { display: user.username === blog.user.name }

  return (
    <div style={blogStyle} className="blog-title">
      <div style={hideWhenVisible}>
        <span>
          {blog.title} {blog.author}
        </span>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="blog-content">
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div className="blog-url">{blog.url}</div>
        <div className="blog-likes">
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={deleteButton} onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
