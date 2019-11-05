const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog({ likes : 0 , ...request.body })
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter