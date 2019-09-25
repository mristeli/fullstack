import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => 
  axios.get(baseUrl).then(response => response.data)

const create = newContact => 
  axios.post(baseUrl, newContact)
    .then(response => response.data)

const update = (id, newObject) => 
  axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)

const deleteContact = id => 
  axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
  
export default { getAll, create, update, delete: deleteContact }
