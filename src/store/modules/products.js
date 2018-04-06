import baratonService from '../../lib/baratonService'

const state = {
  products: []
}

const getters = {
  allProducts (state) {
    return state.products
  }
}

const actions = {
  fetchProducts ({commit}) {
    baratonService.getProducts().then(response => {
      commit('setProducts', response.data.products)
    })
  }
}

const mutations = {
  setProducts (state, products) {
    state.products = products
  },

  decrementProductQuantity (state, {id}) {
    const product = state.products.find(product => product.id === id)
    product.quantity--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
