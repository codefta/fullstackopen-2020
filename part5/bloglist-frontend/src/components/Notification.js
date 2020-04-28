import React from 'react'

const Notification = ({ messageType, message }) => {
  let messageStyle
  if (messageType !== null) {
    messageStyle =
      messageType === 'success'
        ? {
            color: 'green',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: 10,
            marginBottom: 10,
          }
        : {
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: 10,
            marginBottom: 10,
          }
  }

  if (message === null) {
    return null
  } else {
    return <div style={messageStyle}>{message}</div>
  }
}

export default Notification
