import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME, FILTER_BOOK } from '../queries'

const Recommend = (props) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const [getBook, result] = useLazyQuery(FILTER_BOOK)

  useEffect(() => {
    setGenre(props.userMe.favoriteGenre)
    getBook({ variables: { genre: genre } })
  }, [genre, getBook, props.userMe.favoriteGenre])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result]) //eslint-disable-line

  if (!props.show) {
    return null
  }

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
