import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleChangeTitle,
  handleChangeAuthor,
  handleChangeUrl,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleChangeAuthor}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleChangeUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeAuthor: PropTypes.func.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleChangeUrl: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm
