import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card } from 'semantic-ui-react'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Card
            fluid
            key={blog.id}
            as={Link}
            to={`blogs/${blog.id}`}
            header={blog.title}
            meta={blog.author}
          />
        ))}
    </div>
  )
}

export default BlogList
