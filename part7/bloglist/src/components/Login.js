import React, { useState } from 'react'
import { Grid, Header, Form, Button, Segment } from 'semantic-ui-react'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    login({
      username,
      password,
    })

    setUsername('')
    setPassword('')
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="red" textAlign="center">
          Welcome to Bloglist Application
        </Header>
        <Header as="h3" color="red" textAlign="center">
          Log in
        </Header>
        <Form onSubmit={handleLogin}>
          <Segment>
            <Form.Input
              icon="user"
              iconPosition="left"
              placeholder="username"
              id="username"
              name="Username"
              value={username}
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />

            <Form.Input
              icon="lock"
              iconPosition="left"
              placeholder="password"
              id="password"
              name="Password"
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button color="red" fluid size="large" id="login-button">
              login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Login
