const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Matin Blogi',
    'author': 'Matti Meikäläinen',
    'url': 'www.mattimeikäläinen.fi/blog',
    'likes': 5,
    'id': '5faac93de925e283cded8ef1'
  },
  {
    'title': 'Antti',
    'author': 'Antti Asikainen',
    'url': 'www.anttiasikainen.fi/blog',
    'likes': 700,
    'id': '5faac996e925e283cded8ef2'
  }
]
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}