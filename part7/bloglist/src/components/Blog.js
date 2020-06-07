import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { successNotif } from '../reducers/notificationReducer'
import { useRouteMatch } from 'react-router-dom'
import {
  Header,
  Segment,
  Card,
  CardMeta,
  Divider,
  Button,
  Item,
  Menu,
  Comment,
  Form,
} from 'semantic-ui-react'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.userLogged)

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  if (!user || !blog) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))

      successNotif(`blog ${blog.title} by ${blog.author} deleted`, 5)
    }
  }

  const deleteButton = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value
    event.target.comment.value = ''

    dispatch(addComment(blog.id, comment))
  }

  return (
    <Segment fluid>
      <Header as="h2">
        {blog.title} {blog.author}
      </Header>
      <Divider />
      <Menu secondary>
        <Menu.Item name={blog.url} icon="linkify" />
        <Menu.Item name={blog.likes} icon="like" />
        <Menu.Item name={blog.user.name} icon="user plus" />
      </Menu>

      <Button onClick={() => dispatch(likeBlog(blog.id))} id="button-like">
        like
      </Button>
      <Button id="delete-button" style={deleteButton} onClick={handleDelete}>
        remove
      </Button>

      <Comment.Group fluid>
        <Header as="h3" dividing>
          comments
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input type="text" name="comment" />
          <Button type="submit" content="add comment" />
        </Form>
        {blog.comments.map((c, i) => (
          <Segment key={i}>
            <span>{c.content}</span>
          </Segment>
        ))}
      </Comment.Group>
    </Segment>
  )
}

export default Blog
