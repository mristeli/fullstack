const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  console.log('entered test');
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blog id is defined in id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Minun eka testiblogi',
    author: 'Meitsi',
    url: 'http://example.com/blogs/meitsi',
    likes: 666
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'Minun eka testiblogi'
  )
})

test('a blog with no likes is assigned the value 0 ', async () => {
  const newBlog = {
    title: 'My second blog',
    author: 'Heikki Hela',
    url: 'http://example.com/blogs/testi66'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const result = (await helper.blogsInDb())
    .find(blog => blog.title === newBlog.title)

  expect(result.likes).toBe(0)
})

test('a blog with no title & url is rejected', async () => {
  const newBlog = {
    author: 'Heikki Silvennoinen',
    like : 6
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})



