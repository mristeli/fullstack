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

const mostXReducer = f => (most, item) => f(most) < f(item) ? item : most
const authorAndFieldReducer = (resultName, getter, increment) => (result, item) => {
  const currentValue = result[item.author] ? getter(result[item.author]) : 0
  return { ...result,
    [item.author] : {
      [resultName] : currentValue + increment(item),
      'author' : item.author
    }
  }
}

const mostBlogs = blogs => {
  const authorAndBlogsReducer = authorAndFieldReducer(
    'blogs',
    item => item.blogs,
    blog => blog|1
  )
  return blogs.length === 0 
    ? {}
    : Object.values(blogs.reduce(authorAndBlogsReducer, {}))
      .reduce(mostXReducer(item => item.blogs))
}

const mostLikes = blogs => {
  const authorAndLikesReducer = authorAndFieldReducer(
    'likes',
    item => item.likes,
    blog => blog.likes
  )

  return blogs.length === 0 
    ? {}
    : Object.values(blogs.reduce(authorAndLikesReducer, {}))
      .reduce(mostXReducer(item => item.likes))
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
