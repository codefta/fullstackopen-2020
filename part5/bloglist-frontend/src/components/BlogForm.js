import React, { useState } from 'react'
// import PropTypes from 'prop-typess'

const BlogForm = ({
  createBlog,
  // handleSubmit,
  // handleChangeTitle,
  // handleChangeAuthor,
  // handleChangeUrl,
  // title,
  // author,
  // url,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleChangeAuthor}
          />
        </div>
        <div>
          url
          <input
            id="url"
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

// BlogForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   handleChangeAuthor: PropTypes.func.isRequired,
//   handleChangeTitle: PropTypes.func.isRequired,
//   handleChangeUrl: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
// }

export default BlogForm
