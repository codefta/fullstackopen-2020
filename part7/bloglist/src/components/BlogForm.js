import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'semantic-ui-react'

const BlogForm = ({ createBlog }) => {
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
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>title</label>
          <Input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleChangeTitle}
          />
        </Form.Field>
        <Form.Field>
          author
          <Input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleChangeAuthor}
          />
        </Form.Field>
        <Form.Field>
          url
          <Input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleChangeUrl}
          />
        </Form.Field>
        <Button primary type="submit" id="create-blog">
          create
        </Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
