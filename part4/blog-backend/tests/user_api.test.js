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

describe('add user test', () => {
  test('test add new user', async () => {
    const userFirst = await helper.usersInDb()

    const newUser = {
      username: 'fathisiddiqi',
      password: 'fathisiddiqi',
      name: 'Muhammad Fathi',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersFinal = await helper.usersInDb()
    expect(usersFinal).toHaveLength(userFirst.length + 1)

    const usernames = usersFinal.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe('validation input test', () => {
    test('test unique user', async () => {
      const userFirst = await helper.usersInDb()

      const oldUser = {
        username: 'root',
        name: 'root',
        password: 'root',
      }

      const result = await api.post('/api/users').send(oldUser).expect(400)

      expect(result.body.error).toContain('`username` to be unique')

      const userFinal = await helper.usersInDb()
      expect(userFinal).toHaveLength(userFirst.length)
    })

    test('test username minlength', async () => {
      const userFirst = await helper.usersInDb()

      const oldUser = {
        username: 'ro',
        name: 'rootBaru',
        password: 'rootBaru',
      }

      const result = await api.post('/api/users').send(oldUser).expect(400)
      expect(result.body.error).toContain(
        'is shorter than the minimum allowed length'
      )

      const userFinal = await helper.usersInDb()
      expect(userFinal).toHaveLength(userFirst.length)
    })

    test('test password minlength', async () => {
      const userFirst = await helper.usersInDb()

      const oldUser = {
        username: 'rootBaru',
        name: 'rootBaru',
        password: 'ro',
      }

      const result = await api.post('/api/users').send(oldUser).expect(400)
      console.log(result.body.error)
      expect(result.body.error).toBe('invalid password')

      const userFinal = await helper.usersInDb()
      expect(userFinal).toHaveLength(userFirst.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
