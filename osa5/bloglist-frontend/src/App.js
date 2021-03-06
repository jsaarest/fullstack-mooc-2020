import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const defaultMessage = { message: '', variant: '' }

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(defaultMessage)
  const [fetchData, setFetchData] = useState(true) // Create dependency for useState
  const [formOpen, setFormOpen] = useState(false)


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
      setMessage({ message: 'wrong credentials', variant: 'error' })
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
  }, [fetchData]) // Control state to fetch latest data

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const ShowLoggedInStatus = () => {
    if(user){
      const name = user.name || user.username
      return(
        <>
          <p>{name} logged in</p>
          <button onClick={handleLogout} style={{ marginBottom: 12 }}>Logout</button>
        </>
      )
    }
    return null
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
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </>
        :
        <div>
          <h2>Blogs</h2>
          <ShowLoggedInStatus />
          <div>
            { formOpen ?
              <CreateBlogForm
                setFetchData={setFetchData}
                fetchData={fetchData}
                setFormOpen={setFormOpen}
              /> :
              <button
                onClick={() => setFormOpen(true)}>
                New blog
              </button>
            }
          </div>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              fetchData={fetchData}
              setFetchData={setFetchData}
              user={user}
            />
          )}
        </div>
      }
    </>

  )
}

export default App