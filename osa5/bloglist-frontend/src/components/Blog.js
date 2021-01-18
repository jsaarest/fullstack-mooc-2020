import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, fetchData, setFetchData }) => {

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

  return (
    <div style={cardStyle}>
      {blog.title} {blog.author} <button onClick={() => setExpand(!expand)}>{expand ? 'hide' : 'view'}</button>
      {expand &&
      <div>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes}</p><button onClick={handleUpdate}>like</button>

      </div>
      }
    </div>
  )
}

export default Blog
