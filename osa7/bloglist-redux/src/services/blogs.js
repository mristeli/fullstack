import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => (
  token = `bearer ${newToken}`
)

function getConfig() {
  return {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const update = async blog => {
  const response =  await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return response.data
}

const addComment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, {
    comment
  }, getConfig())
  return response.data
}

const remove = async blog => {
  await axios.delete(`${baseUrl}/${blog.id}`, getConfig())
}

export default {
  getAll,
  create,
  update,
  remove,
  addComment,
  setToken
}
