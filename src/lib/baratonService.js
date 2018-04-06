import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/static'

export default {

  getCategories () {
    return axios.get('/categories.json')
  },

  getProducts () {
    return axios.get('/products.json')
  }

}
