import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log('token', token)
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('config', config)
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const createBlog = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const putBlog = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const postBlogComments = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, putBlog, deleteBlog, postBlogComments }