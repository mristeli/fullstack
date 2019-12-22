const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user =  await User.findById(decodedToken.id)
    const blog = new Blog({ likes : 0 , ...request.body,
      user: user.id })

    const newBlogId= (await blog.save())._id
    user.blogs = user.blogs.concat(newBlogId)
    await user.save()

    const savedBlog = await Blog.findById(newBlogId)
      .populate('user', { username: 1, name: 1 })
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogToDelete = await Blog.findById(request.params.id)
    if(!blogToDelete) {
      response.status(404).end()
    }
    if(!blogToDelete.user || blogToDelete.user.toString() !== decodedToken.id) {
      response.status(401).json({ error: 'user not authorized to delete blog'})
    }
    await blogToDelete.remove()
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    likes : body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
      { $push: { comments: body.comment } }, { new: true } )
      .populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter