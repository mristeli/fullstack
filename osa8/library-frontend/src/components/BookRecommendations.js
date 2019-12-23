import React, { useState, useEffect } from 'react'

import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

const ALL_BOOKS = gql`
  query allBooksByGenre($genre: String!) {
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

const ME = gql`
query {
  me {
   	username
    id
    favoriteGenre
  }
}
`

const BookRecommendations = (props) => {  
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const client = useApolloClient()
  
  useEffect(() => {
    const fetchGenre = async () => {
      const { data } = await client.query({
        query: ME
      })
      setGenre(data.me.favoriteGenre)
    }
    fetchGenre()
  }, [client])
  useEffect(() => {
    const showRecommendations = async (genre) => {
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre }
      })
      setBooks(data.allBooks)
    }
    if(genre) {
      showRecommendations(genre)
    }
  }, [genre, client])

  if(!books) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>in your favorite genre <b>{genre}</b></p>

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
    </div>
  )
}

export default BookRecommendations