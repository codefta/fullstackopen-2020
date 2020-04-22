const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('root', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })

  await user.save()
})

describe('login test', () => {
  test('user can login', async () => {
    const userLogin = {
      username: 'root',
      password: 'root',
    }

    const userLoggedIn = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(userLoggedIn.body.username).toBe(userLogin.username)
  })

  test('user cannot login', async () => {
    const newUserLogin = {
      username: 'root',
      password: 'error',
    }

    const userLoggedIn = await api
      .post('/api/login')
      .send(newUserLogin)
      .expect(401)

    expect(userLoggedIn.body.error).toBe('invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
