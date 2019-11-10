const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const getTokenForTest = user => 
  jwt.sign({ 
    username: user.username,
    id: user.id
  }, process.env.SECRET)


describe('when there are initially some blogs in the database', () => {
  beforeEach(async () => {
    await User.remove({})
    const userObjets = helper.initialUsers
      .map(user => new User(user))
    const userPromises = userObjets.map(user => user.save())
    const users = await Promise.all(userPromises)

    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog({ user: users[0].id, ...blog }))
    const promiseArray = blogObjects
      .map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    console.log('entered test')
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

  describe('adding of a blog', () => {
    test('succeeds with a valid blog', async () => {
      const token = getTokenForTest((await helper.usersInDb())[0])

      const newBlog = {
        title: 'Minun eka testiblogi',
        author: 'Meitsi',
        url: 'http://example.com/blogs/meitsi',
        likes: 666
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(n => n.title)
      expect(contents).toContain(
        'Minun eka testiblogi'
      )
    })

    test('with no likes is assigned 0 likes', async () => {
      const token = getTokenForTest((await helper.usersInDb())[0])

      const newBlog = {
        title: 'My second blog',
        author: 'Heikki Hela',
        url: 'http://example.com/blogs/testi66'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result = (await helper.blogsInDb())
        .find(blog => blog.title === newBlog.title)

      expect(result.likes).toBe(0)
    })

    test('with no title & url is rejected', async () => {
      const token = getTokenForTest((await helper.usersInDb())[0])

      const newBlog = {
        author: 'Heikki Silvennoinen',
        like : 6
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with a status code 204 if id is valid', async () => {
      const originalBlogs = await helper.blogsInDb()
      const blogToDelete = originalBlogs[0]

      const token = getTokenForTest((await helper.usersInDb())[0])

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAfterDeletion = await helper.blogsInDb()

      expect(blogsAfterDeletion.length).toBe(
        helper.initialBlogs.length - 1
      )

      const contents = blogsAfterDeletion.map(r => r.title)
      expect(contents).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with a valid id', async () => {
      const originalBlogs = await helper.blogsInDb()
      const blogToUpdate = originalBlogs[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes : blogToUpdate.likes + 2 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterUpdate = await helper.blogsInDb()
      const updatedBlog = blogsAfterUpdate.find(
        b => b.id === blogToUpdate.id
      )
      expect(updatedBlog.likes).toBe(blogToUpdate.likes + 2)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})