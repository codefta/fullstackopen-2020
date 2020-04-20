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

test('verify that blogs can send POST request', async () => {
  const newBlog = {
    title: 'My test Article',
    author: 'Fathi',
    url: 'http://locahost:3003/test',
    like: 4,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blogsTitle = blogsAtEnd.map((b) => b.title)
  expect(blogsTitle).toContain('My test Article')
})

afterAll(() => {
  mongoose.connection.close()
})
