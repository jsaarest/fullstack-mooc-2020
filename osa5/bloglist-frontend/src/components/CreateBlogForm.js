import React, {useState} from "react";
import blogService from "../services/blogs";


const CreateBlogForm = ({setFetchData, fetchData, setFormOpen}) => {

  const defaultFormData = { title: '', author: '', url: '' }
  const defaultMessage = { message: '', variant: '' }
  const [form, setForm] = useState(defaultFormData)
  const [message, setMessage] = useState(defaultMessage)

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
      setFormOpen(false)
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

  return(
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
  )
}

export default CreateBlogForm
