const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (value, totalValue) => value + totalValue

  return blogs.map((b) => b.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (maxValue, totalValue) => Math.max(maxValue, totalValue)

  const maxLikes = blogs.map((b) => b.likes).reduce(reducer, -Infinity)

  const findBlog = blogs.find((b) => b.likes === maxLikes)
  return findBlog
}

const mostBlogs = (blogs) => {
  const authorGroupped = _(blogs)
    .groupBy('author')
    .map((a, i) => {
      return {
        author: i,
        blogs: a.length,
      }
    })
    .values()
    .value()

  const reducer = (maxValue, totalValue) => Math.max(maxValue, totalValue)

  const mostBlog = authorGroupped.map((a) => a.blogs).reduce(reducer, -Infinity)

  const findAuthor = authorGroupped.find((a) => a.blogs === mostBlog)
  return findAuthor
}

const mostLikes = (blogs) => {
  const reducer = (value, totalValue) => value + totalValue

  const authorGroupped = _(blogs)
    .groupBy('author')
    .map((a, i) => {
      return {
        author: i,
        likes: a.map((b) => b.likes).reduce(reducer, 0),
      }
    })
    .values()
    .value()

  const reducer2 = (maxValue, totalValue) => Math.max(maxValue, totalValue)

  const mostLikes = authorGroupped
    .map((a) => a.likes)
    .reduce(reducer2, -Infinity)

  const findAuthor = authorGroupped.find((a) => a.likes === mostLikes)

  return findAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
