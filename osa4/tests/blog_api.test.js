const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('that identifier is id', async () => {
  const res = await api.get('/api/blogs')
  const id = res.body.map(r => r.id)
  expect(id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 2,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const title = res.body.map(r => r.title)
  expect(res.body).toHaveLength(initialBlogs.length + 1)
  expect(title).toContain(
    'React patterns'
  )
})

test('default value of likes is zero ', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const res = await api.get('/api/blogs')
  const body = res.body[res.body.length - 1]
  expect(body.likes).toBe(0)
})

test('blog without title will not be added ', async () => {
  const newBlog = {
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 2
  }
  const blogsAtStart = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const res = await api.get('/api/blogs')
  expect(res.body.length).toBe(blogsAtStart.body.length)
})

afterAll(() => {
  mongoose.connection.close()
})

