import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BookRecommendations from './components/BookRecommendations'

import { gql } from 'apollo-boost'
import { useQuery, useSubscription, useMutation, useApolloClient } from '@apollo/react-hooks'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  id
  genres
  author {
    name
    id
  }
}
`

const ALL_BOOKS = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
    ...BookDetails
  }
}
${BOOK_DETAILS}
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

  const [message, setMessage] = useState(null)

  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  
  useEffect(() => {
    if(localStorage.getItem('user-token')) {
      setToken(localStorage.getItem('user-token'))
    }
  }, [])


  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    let dataInStore = { allBooks: [],
      allAuthors: [] }
    try {
      dataInStore = client.readQuery({ query: ALL_BOOKS })
    } catch (error) {
    }
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
      addedBook.genres.forEach(genre => {
        try {
          dataInStore = client.readQuery({ 
            query: ALL_BOOKS,
            variables: { genre }
          })
        } catch (error) {
        }
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre },
          data: dataInStore.allBooks.concat(addedBook)
        })
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`Someone just added a book ${addedBook.title}`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  const authors = useQuery(ALL_AUTHORS)
  const [addBook] = useMutation(ADD_BOOK, {
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
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

  const Notification = () => message &&
    <div style={{ color: 'green' }}>
      {message}
    </div>

  return (
    <div>
      <Notification />
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