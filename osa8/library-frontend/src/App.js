import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    published
    author
    id
    genres 
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    id
    bookCount
  }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    author
    genres
    id
  }
}
`
const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
    id
    bookCount
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')

  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS },
      { query: ALL_AUTHORS }]
  })

  const [setBirth] = useMutation(EDIT_AUTHOR)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors result={authors} setBirth={setBirth}
        show={page === 'authors'}
      />

      <Books result={books}
        show={page === 'books'}
      />

      <NewBook addBook={addBook}
        show={page === 'add'}
      />

    </div>
  )
}

export default App