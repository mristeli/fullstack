import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import  { useField } from './hooks'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [ message, setMessage ] = useState(null)

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService.getAll()
      .then((response) => {
        setBlogs(response.sort((a, b) => b.likes - a.likes))
      })
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async () => {
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch(exception) {
      showError('wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const loginForm = () => (
    <div className='loginForm'>
      <h2>Log in to application</h2>
      <Notification message={message} />
      <LoginForm
        usernameField={username}
        passwordField={password}
        handleLogin={handleLogin}
      />
    </div>
  )

  const showMessage = text => {
    setMessage({
      text,
      className: 'success'
    })
    setTimeout(setMessage, 5000, null)
  }

  const showError = text => {
    setMessage({
      text,
      className: 'error'
    })
    setTimeout(setMessage, 5000, null)
  }

  const Notification = ({ message }) => {
    if(message === null) return null
    return (
      <div className={message.className}>
        {message.text}
      </div>
    )
  }

  const createBlog = async (blog) => {
    const created = await blogService.create(blog)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(created))
    showMessage(`a new blog ${blog.title} by ${blog.author} added`)
  }

  const addLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    setBlogs(
      blogs.reduce((blogs, b) =>
        blogs.concat(
          b.id === blog.id ?
            updatedBlog :
            b
        ), []).sort((a, b) => b.likes - a.likes)
    )
    blogService.update(updatedBlog)
  }

  const removeBlog = (blog) => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      setBlogs(blogs.filter(b => b.id !== blog.id))
      blogService.remove(blog)
    }
  }

  const blogFormRef = React.createRef()

  const blogList = () => (
    <div className='blogList'>
      <h2>blogs</h2>
      <Notification message={message} />

      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <CreateBlogForm createBlog={createBlog} />
      </Togglable>

      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} loggedInUser={user} removeBlog={() => removeBlog(blog)}/>
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App
