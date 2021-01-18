import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, fetchData, setFetchData, user }) => {

  const [expand, setExpand] = useState(false)

  const cardStyle = {
    boxShadow: '4px 2px 31px 7px rgba(0,0,0,0.15)',
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
    marginBottom: 6,
    width: 350
  }

  //console.log(blog)

  const handleUpdate = async () => {
    const updateObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    try {
      await blogService.update(blog.id, updateObj)
      setFetchData(!fetchData)
    }
    catch (err) {
      console.log(err)
    }

  }
  console.log("blog", blog)
  console.log(user)

  const isCreatedByUser = () => user.username === blog?.user?.username

  const handleDelete = async () => {
    if(window.confirm(`Are you sure you want to delete: ${blog.title} by ${blog.author}`)){
      //console.log(blog.id)
      try {
        await blogService.deleteById(blog.id)
        setFetchData(!fetchData)
      }
      catch (err) {
        console.log(err.message)
      }
    }
  }

  return (
    <div style={cardStyle}>
      {blog.title} {blog.author} <button onClick={() => setExpand(!expand)}>{expand ? 'hide' : 'view'}</button>
      {expand &&
      <div>
        <p>url: {blog.url}</p>
        <div>
          likes: {blog.likes}<button onClick={handleUpdate}>like</button>
        </div>
        { isCreatedByUser() && <button style={{marginTop: 12}} onClick={handleDelete}>delete</button>}


      </div>
      }
    </div>
  )
}

export default Blog
