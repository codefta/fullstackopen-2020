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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
