import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Segment, Header } from 'semantic-ui-react'

const User = () => {
  const users = useSelector((state) => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match ? users.find((u) => u.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <Segment>
      <Header as="h3">{user.name}</Header>
      <p>
        <b>added blogs</b>
      </p>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </Segment>
  )
}

export default User
