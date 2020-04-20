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
    likes: 4,
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

test('blog added without likes property', async () => {
  const newBlog = {
    title: 'My test Article',
    author: 'Fathi',
    url: 'http://locahost:3003/test',
  }

  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(blog.body.likes).toBe(0)
})

test('blog added without title and url', async () => {
  const newBlog = {
    author: 'Fathi',
    likes: 4,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('delete blog', async () => {
  const blogs = await helper.blogInDb()
  const firstOfBlogs = blogs[0]

  await api.delete(`/api/blogs/${firstOfBlogs.id}`).expect(204)

  const finalBlogs = await helper.blogInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length - 1)

  const contents = finalBlogs.map((f) => f.title)
  expect(contents).not.toContain(contents)
})

test('update blog', async () => {
  const blogs = await helper.blogInDb()
  const firstOfBlogs = blogs[0]

  const newBlog = {
    title: 'My First Article',
    author: 'Fathi',
    url: 'http://localhost:3003/blogs/1',
    likes: 5,
  }

  await api
    .put(`/api/blogs/${firstOfBlogs.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()

  const blogsUpdated = blogsAtEnd.find((b) => b.id === firstOfBlogs.id)
  delete blogsUpdated.id

  expect(blogsUpdated).toEqual(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})
