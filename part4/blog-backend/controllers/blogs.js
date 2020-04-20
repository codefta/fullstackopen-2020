const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({})
  res.json(blogs.map((b) => b.toJSON()))
})

blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)

  try {
    const result = await blog.save()

    res.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
