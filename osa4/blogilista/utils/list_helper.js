const dummy = (blogs) => {
  return blogs.length + 1 - blogs.length
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (currentFavorite, item) => {
    return currentFavorite.likes < item.likes
      ? item
      : currentFavorite
  }

  return blogs.length === 0
    ? {}
    : blogs.reduce(reducer, blogs[0])
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
