import { extractNumericPrice } from '../../lib/priceUtils'

const state = {
  productsAdded: []
}

const getters = {
  productsInCart (state, getters, root) {
    return state.productsAdded.map(({ id, quantity }) => {
      const item = root.products.products.find(product => product.id === id)
      return {
        name: item.name,
        price: item.price,
        id: item.id,
        quantity
      }
    })
  },

  productsInCartTotal (state, getters) {
    return getters.productsInCart.reduce((total, product) => {
      return total + product.quantity
    }, 0)
  },

  totalCartPrice (state, getters) {
    return getters.productsInCart.reduce((total, product) => {
      return total + extractNumericPrice(product.price) * product.quantity
    }, 0)
  }
}

const actions = {
  checkout ({commit, state, dispatch}, products) {
    commit('setCartProducts', { products: [] })
    dispatch('saveCart')
  },

  addProduct ({ state, commit, dispatch }, product) {
    if (product.quantity > 0) {
      const cartProduct = state.productsAdded.find(item => item.id === product.id)

      if (!cartProduct) {
        commit('addNewProduct', {id: product.id})
      } else {
        commit('incrementCartProductQuantity', cartProduct)
      }

      commit('decrementProductQuantity', { id: product.id })
      dispatch('saveCart')
    }
  },

  removeProduct ({ state, commit, dispatch }, product) {
    const cartProduct = state.productsAdded.find(item => item.id === product.id)

    if (cartProduct.quantity > 1) {
      commit('decrementCartProductQuantity', { id: product.id })
    } else {
      commit('removeProduct', { id: product.id })
    }

    commit('incrementProductQuantity', cartProduct)
    dispatch('saveCart')
  },

  saveCart ({state}) {
    window.localStorage.setItem('baraton-cart', JSON.stringify(state.productsAdded))
  },

  loadCart ({state, commit}) {
    let cart = window.localStorage.getItem('baraton-cart')

    if (cart) {
      commit('setCartProducts', { products: JSON.parse(cart) })
    }
  }
}

const mutations = {
  addNewProduct (state, { id }) {
    state.productsAdded.push({
      id,
      quantity: 1
    })
  },

  removeProduct (state, { id }) {
    let index = state.productsAdded.findIndex(product => product.id === id)
    state.productsAdded.splice(index, 1)
  },

  incrementCartProductQuantity (state, { id }) {
    const cartProduct = state.productsAdded.find(product => product.id === id)
    cartProduct.quantity++
  },

  decrementCartProductQuantity (state, { id }) {
    const cartProduct = state.productsAdded.find(product => product.id === id)
    cartProduct.quantity--
  },

  setCartProducts (state, { products }) {
    state.productsAdded = products
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
