import baratonService from '../../lib/baratonService'

const state = {
  products: [],
  category: -1
}

const getters = {
  allProducts (state) {
    return state.products
  },

  categoryProducts (state) {
    return state.products.filter(product => product.sublevel_id === state.category)
  },

  selectedId () {
    return state.category
  }
}

const actions = {
  fetchProducts ({commit, dispatch}) {
    baratonService.getProducts().then(response => {
      commit('setProducts', response.data.products)
      dispatch('loadCart')
    })
  },

  selectId ({commit}, id) {
    commit('setCategory', id)
  }
}

const mutations = {
  setProducts (state, products) {
    state.products = products
  },

  decrementProductQuantity (state, {id}) {
    const product = state.products.find(product => product.id === id)
    product.quantity--
  },

  incrementProductQuantity (state, {id}) {
    const product = state.products.find(product => product.id === id)
    product.quantity++
  },

  setCategory (state, category) {
    state.category = category
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
