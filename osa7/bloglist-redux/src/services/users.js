import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newUser => {
  const response =  await axios.post(baseUrl, newUser)
  return response.data
}

const update = async user => {
  const response =  await axios.put(`${baseUrl}/${user.id}`, user)
  return response.data
}

const remove = async user => {
  await axios.delete(`${baseUrl}/${user.id}`)
}

export default {
  getAll,
  create,
  update,
  remove
}