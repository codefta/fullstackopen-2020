const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'My First Article',
    author: 'Fathi',
    url: 'http://localhost:3003/blogs/1',
    likes: 3,
  },
  {
    title: 'My Second Article',
    author: 'Fathi',
    url: 'http://localhost:3003/blogs/1',
    likes: 5,
  },
]

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  blogInDb,
  usersInDb,
  initialBlogs,
}
