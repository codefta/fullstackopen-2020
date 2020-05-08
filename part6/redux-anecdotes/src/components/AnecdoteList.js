import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    props.voteAnecdote(id)
    const anecdote = props.anecdotes.find((a) => a.id === id)

    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote.id)}
          />
        ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes,
    }
  }

  const filteredAnecdotes = state.anecdotes.filter((a) =>
    a.content.toLowerCase().includes(state.filter.toLowerCase())
  )

  return {
    anecdotes: filteredAnecdotes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteAnecdote: (id) => {
      dispatch(voteAnecdote(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
