import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BookRecommendations from './components/BookRecommendations'

import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

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
    author {
      name
    }
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = () => {
  const client = useApolloClient()

  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  useEffect(() => {
    if(localStorage.getItem('user-token')) {
      setToken(localStorage.getItem('user-token'))
    }
  }, [])

  const authors = useQuery(ALL_AUTHORS)
  const [addBook] = useMutation(ADD_BOOK, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ 
        query: ALL_BOOKS
      })
      dataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
      response.data.addBook.genres.forEach(genre => {
        const dataInStore = store.readQuery({ 
          query: ALL_BOOKS,
          variables: { genre }
        })
        dataInStore.allBooks.push(response.data.addBook)
        store.writeQuery({
          query: ALL_BOOKS,
          variables: { genre },
          data: dataInStore
        })
      })
    }
  })
  const [setBirth] = useMutation(EDIT_AUTHOR)
  const [login] = useMutation(LOGIN)

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && 
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
        }
        { !token && 
          <button onClick={() => setPage('login')}>authentication</button> 
        }
      </div>

      {!token && page === 'login' &&
        <LoginForm 
          login={login}
          setToken={(token) => setToken(token)}
        />
      }
      { page === 'authors' &&
        <Authors result={authors} setBirth={setBirth}
          allowEdit={token}
        />
      }
      { page === 'books' &&
        <Books /> 
      }
      {token && page === 'add' &&
        <NewBook addBook={addBook} />
      }
      {token && page === 'recommend' &&
        <BookRecommendations />
      }
    </div>
  )
}

export default App