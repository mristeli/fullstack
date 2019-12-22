import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import MainView from './components/MainView'
import { initializeAuthentication } from './reducers/authenticationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

function App ({
  initializeAuthentication,
  initializeUsers,
  initializeBlogs }) {
  useEffect(() => {
    initializeAuthentication()
    initializeUsers()
    initializeBlogs()
  }, [initializeAuthentication, initializeUsers, initializeBlogs])

  return (
    <div className="container">
      <MainView />
    </div>
  )
}

export default connect(
  null,
  { initializeAuthentication, initializeUsers, initializeBlogs }
)(App)
