import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/'

const getPublicContent = () => {
  return axios.get(API_URL + 'all')
}

const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() })
}

const getModeratorBoard = () => {
  return axios.get(API_URL + 'mod', { headers: authHeader() })
}

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() })
}

const getProducts = async () => {
  var data = await axios.get(API_URL + 'product', { headers: authHeader() })
  return data
}

const getReviews = async (id) => {
  let data = await axios.get(API_URL + 'review/' + id.id, {
    headers: authHeader(),
  })
  console.log('review' + JSON.stringify(data))
  return data
}

const deleteReview = async (id) => {
  let data = await axios.delete(API_URL + 'review/' + id, {
    headers: authHeader(),
  })
  console.log('review' + JSON.stringify(data))
  return data
}

const sendReview = async (feedback) => {
  let data = await axios.post(API_URL + 'review/sendReview', feedback, {
    headers: authHeader(),
  })
  console.log('review' + JSON.stringify(data))
  return data
}

const updateReview = async (feedback, id) => {
  let data = await axios.put(API_URL + 'review/updateReview/' + id, feedback, {
    headers: authHeader(),
  })
  console.log('review' + JSON.stringify(data))
  return data
}
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getProducts,
  getReviews,
  deleteReview,
  sendReview,
  updateReview,
}

export default UserService
