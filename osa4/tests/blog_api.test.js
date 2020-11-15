const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


describe('blog tests', () => {
  let token = ''
  beforeAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    const newUser = {
      username: 'mattim',
      name: 'Matti Meikäläinen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .post('/api/login')
      .send({
        username: 'mattim',
        password: 'salainen'
      })

    token = 'bearer ' + response.body.token
    console.log(token)

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
      .set({ Authorization: token })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const title = res.body.map(r => r.title)
    expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(title).toContain(newBlog.title)
  })

  test('a valid blog can be deleted', async () => {
    const firstAvailableBlog = await api.get('/api/blogs')
    const blogDelete = firstAvailableBlog.body[0]

    await api
      .delete(`/api/blogs/${blogDelete.id}`)
      .set({ Authorization: token })
      .expect(204)

    const res = await api.get('/api/blogs')
    const title = res.body.map(r => r.title)
    expect(res.body).toHaveLength(helper.initialBlogs.length - 1)
    expect(title).not.toContain(blogDelete.title)
  })

  test('default value of likes is zero ', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/'
    }
    await api
      .post('/api/blogs')
      .set({ Authorization: token })
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
    const blogsAtStart = helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)

    expect(helper.blogsInDb().length).toBe(blogsAtStart.length)
  })

  test('blog without authorization will not be added ', async () => {
    const newBlog = {
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 2
    }
    const blogsAtStart = helper.blogsInDb()

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    expect(response.body.error).toContain('invalid token')
    expect(helper.blogsInDb().length).toBe(blogsAtStart.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })


})



