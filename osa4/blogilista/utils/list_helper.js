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


const mostX = (fieldName, increment) => blogs => {
  // list of blogs -> author : { author, fieldName } object
  const authorAndFieldReducer = (result, item) => {
    const currentValue = result[item.author] ? result[item.author][fieldName] : 0
    return { ...result,
      [item.author] : {
        [fieldName] : currentValue + increment(item),
        'author' : item.author
      }
    }
  }
  return blogs.length === 0
    ? {}
    : Object.values(blogs.reduce(authorAndFieldReducer, {}))
      .reduce((most, item) => most[fieldName] < item[fieldName] ? item : most)
}

const mostBlogs = mostX('blogs', item => item|1) // item|1 instead of 1 to get rid of eslint error)
const mostLikes = mostX('likes', item => item.likes)

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
