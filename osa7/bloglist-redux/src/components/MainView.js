import React from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'

import { removeUser } from '../reducers/authenticationReducer'

import Notification from './Notification'
import LoginForm from './LoginForm'
import UserList from './UserList'
import User from './User'
import BlogList from './BlogList'
import Blog from './Blog'

import { Navbar, Nav, Button } from 'react-bootstrap'

const MainView = ({ user, removeUser }) => {
  const Menu = () => {
    const padding = {
      padding: 5
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
          </Nav>
          <Navbar.Text>
            logged in as {user.name}
          </Navbar.Text>
          <Button onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    removeUser()
  }

  return (
    <Router>
      <div>
        { user ? <Menu /> : <Redirect to="/login" />}
        <h2>blog app</h2>
        <Notification />
        <Route exact path="/login" render={() => (
          !user ? <LoginForm /> : <Redirect to="/" />
        )} />
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