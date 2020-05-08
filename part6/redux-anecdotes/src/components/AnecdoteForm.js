import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addNewAnecdote = async (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(anecdote)

    props.setNotification(`you created '${anecdote}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAnecdote: (value) => {
      dispatch(addAnecdote(value))
    },
    setNotification: (content, timeout) => {
      dispatch(setNotification(content, timeout))
    },
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
