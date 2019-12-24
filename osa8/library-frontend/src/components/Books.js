import React, { useState, useEffect } from 'react'

import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'


const ALL_BOOKS = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      id
      genres
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`

const Books = (props) => {  
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const fetchGenres = async (genre) => {
      const { data } = await client.query({
        query: ALL_BOOKS
      })
      setGenres(
        data.allBooks.flatMap(b => b.genres)
          .reduce((unique, g) => unique.includes(g) ? unique : [...unique, g], [])
          .sort()
      )
    }
    fetchGenres()
  }, [client])
  useEffect(() => {
    const showBooks = async (genre) => {
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: genre ? { genre } : {}
      })
      setBooks(data.allBooks)
    }
    showBooks(genre)
  }, [genre, client])


  if (!books) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>genres</h2>
      <p>
        {genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      </p>
      <p><button key="all" onClick={() => setGenre(null)}>Show all genres</button></p>
    </div>
  )
}

export default Books