import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      {users.map((u) => (
        <Card
          fluid
          key={u.id}
          as={Link}
          to={`users/${u.id}`}
          header={u.name}
          meta={`has ${u.blogs.length} blogs`}
        />
      ))}
    </div>
  )
}

export default Users
