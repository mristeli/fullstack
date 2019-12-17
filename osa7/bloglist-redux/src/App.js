import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LoginForm from './components/LoginForm'
import MainView from './components/MainView'
import { initializeAuthentication } from './reducers/authenticationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

function App ({ user,
  initializeAuthentication,
  initializeUsers,
  initializeBlogs }) {
  useEffect(() => {
    initializeAuthentication()
    initializeUsers()
    initializeBlogs()
  }, [initializeAuthentication, initializeUsers, initializeBlogs])

  return (
    <div>
      {user === null ?
        <LoginForm /> :
        <div>
          <MainView />
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { initializeAuthentication, initializeUsers, initializeBlogs }
)(App)
