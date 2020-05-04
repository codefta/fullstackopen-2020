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

  const deleteButton = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  return (
    <div style={blogStyle} className="blog-title">
      <div style={hideWhenVisible}>
        <span>
          {blog.title} {blog.author}
        </span>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="blog-content">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>hide</button>
        <div className="blog-url">{blog.url}</div>
        <div className="blog-likes">
          <span>{blog.likes}</span>{' '}
          <button onClick={handleLike} id="button-like">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button id="delete-button" style={deleteButton} onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
