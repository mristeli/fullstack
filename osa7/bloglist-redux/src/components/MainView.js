import React from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

import { removeUser } from '../reducers/authenticationReducer'

import Notification from './Notification'
import UserList from './UserList'
import User from './User'
import BlogList from './BlogList'
import Blog from './Blog'

const MainView = ({ user, removeUser }) => {

  const Menu = () => {
    const style = {
      background: 'lightgrey'
    }
    const padding = {
      padding: 5
    }
    return (
      <div style={style}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    removeUser()
  }

  return (
    <Router>
      <div>
        <Menu />
        <h2>blog app</h2>
        <Notification />

        <Route exact path="/users" render={() =>
          <UserList />
        } />
        <Route exact path="/users/:id" render={({ match }) =>
          <User id={match.params.id} />
        } />

        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog id={match.params.id} />
        } />

        <Route exact path="/" render={() =>
          <BlogList />
        } />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { removeUser })(MainView)