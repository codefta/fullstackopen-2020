const Blog = require('../models/blog')

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

module.exports = {
  blogInDb,
}
