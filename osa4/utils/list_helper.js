const _ = require('lodash')

const dummy = blogs => {
  if(blogs){
    return 1
  }
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) return 0
  if(blogs.length === 1) return blogs[0].likes
  return blogs.reduce((acc, cur) => (acc + cur.likes), 0)
}

const favoriteBlog = blogs => {
  if(blogs.length > 0){
    const res = _.maxBy(blogs, 'likes')
    return {
      author: res.author,
      likes: res.likes
    }
  }
  return 0
}

const mostLikes = blogs => {
  if(blogs.length > 0){
    const authors = blogs.map((blog) => ({author: blog.author, likes: blog.likes}))

    const uniques = _(authors)
      .groupBy('author')
      .map((obj, key) => ({
        author: key,
        likes: _.sumBy(obj, 'likes')
      }))
      .value()

    const res = _.maxBy(uniques, 'likes')
    return {
      author: res.author,
      likes: res.likes
    }
  }
  return 0
}

const mostBlogs = blogs => {
  if(blogs.length > 0){
    const authors = blogs.map((blog) => ({author: blog.author}))

    const uniques = _(authors)
      .countBy('author')
      .map((value, key) => ({
        author: key,
        blogs: value
      }))
      .value()

    const result = _.maxBy(uniques, 'blogs')
    return {
      author: result.author,
      blogs: result.blogs
    }
  }
  return 0
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  favoriteBlog
}

