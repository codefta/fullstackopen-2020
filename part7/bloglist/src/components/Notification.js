import React from 'react'
import { useSelector } from 'react-redux'
import { Message, Grid } from 'semantic-ui-react'

const Notification = () => {
  const notif = useSelector((state) => state.notification)
  console.log(notif)

  if (notif === null) {
    return null
  } else {
    if (notif.type === 'success') {
      return (
        <Grid textAlign="center" verticalAlign="top">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Message positive>{notif.message}</Message>
          </Grid.Column>
        </Grid>
      )
    } else {
      return (
        <Grid textAlign="center" verticalAlign="top">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Message negative>{notif.message}</Message>
          </Grid.Column>
        </Grid>
      )
    }
  }
}

export default Notification
