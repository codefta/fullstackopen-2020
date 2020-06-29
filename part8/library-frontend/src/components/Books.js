import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const results = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (results.loading) {
    return <div>loading...</div>
  }

  const genres = results.data.allBooks
    .map((b) => b.genres)
    .reduce((acc, curr) => acc.concat(curr), [])
    .filter((val, index, self) => {
      return self.indexOf(val) === index
    })
    .concat('all')

  const filteredBooks =
    genre === 'all'
      ? results.data.allBooks
      : results.data.allBooks.filter((b) => b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <b>{genre}</b>{' '}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button onClick={() => setGenre(g)} key={g}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
