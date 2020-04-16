const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (value, totalValue) => value + totalValue

  return blogs.map((b) => b.likes).reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
