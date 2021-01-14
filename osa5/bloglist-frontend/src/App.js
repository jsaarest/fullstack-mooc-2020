import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const defaultFormData = { title: '', author: '', url: '' }
  const defaultMessage = { message: '', variant: '' }

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(defaultMessage)
  const [fetchData, setFetchData] = useState(true);
  const [form, setForm] = useState(defaultFormData)

  //console.log("user", user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({message: 'wrong credentials', variant: 'error'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [fetchData])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const ShowLoggedInStatus = () => {
    if(!!user){
      const name = user.name || user.username;
      return(
        <>
          <p>{name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </>
      )
    }
    return null
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const newObject = {
        title: form.title,
        author: form.author,
        url: form.url
      }
      const newBlog = await blogService.create(newObject)
      setMessage({ message: `${newBlog.title} has been added!`, variant: 'success' })
      setForm(defaultFormData)
      setFetchData(!fetchData)
      setTimeout(() => setMessage(defaultMessage), 5000)
    }
    catch (err) {
      console.log(setMessage({ message: err.message, variant: 'error' }))
      setTimeout(() => setMessage(defaultMessage), 5000)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value})
  }


  return (
    <>
    <Notification message={message.message} variant={message.variant} />
      {user === null ?
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </>
        :
        <div>
          <h2>Blogs</h2>
          <ShowLoggedInStatus/>
          <div>
            <h2>Create new</h2>
            <form onSubmit={handleAddBlog}>
              <div>
                Title:
                <input
                  type="text"
                  value={form.title}
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div>
                Author:
                <input
                  type="text"
                  value={form.author}
                  name="author"
                  onChange={handleChange}
                />
              </div>
              <div>
                URL:
                <input
                  type="text"
                  value={form.url}
                  name="url"
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleAddBlog}>Create</button>
            </form>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>}
      </>

  )
}

export default App