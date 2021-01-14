import axios from 'axios'
const baseUrl = '/api/blogs'

let loginToken = null

const setToken = token => {
  loginToken = `bearer ${token}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: loginToken }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  return await axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteById = async (id) => {
  const config = {
    headers: { Authorization: loginToken }
  }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  setToken,
  getAll,
  create,
  update,
  deleteById
}
