const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

//beforeEach(() => {

//})

test('a blogs return list of json data', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a blogs have unique identifier as id', async () => {
  const res = await Blog.find({})

  const blogs = res.map((r) => r.toJSON().id)

  expect(blogs).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
