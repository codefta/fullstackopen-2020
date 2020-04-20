const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('a blogs return list of json data', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a blogs have unique identifier as id', async () => {
  const res = await helper.blogInDb()

  const blogsId = res.map((r) => r.id)

  expect(blogsId).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
