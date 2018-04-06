const state = {
  productsAdded: []
}

const getters = {
  productsInCart (state, getters, root) {
    return state.productsAdded.map(({ id, quantity }) => {
      const item = root.productsAdded.all.find(product => product.id === id)
      return {
        name: item.name,
        price: item.price,
        quantity
      }
    })
  },

  totalCartPrice (state, getters) {
    return getters.productsInCart.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

const actions = {
  checkout ({commit, state}, products) {
    // const cartProducts = [...state.productsAdded]

    commit('setCartProducts', { products: [] })
  },

  addProduct ({ state, commit }, product) {
    if (product.quantity > 0) {
      const cartProduct = state.productsAdded.find(item => item.id === product.id)

      if (!cartProduct) {
        commit('addNewProduct', {id: product.id})
      } else {
        commit('incrementCartProductQuantity', cartProduct)
      }

      commit('decrementProductQuantity', { id: product.id })
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

  incrementCartProductQuantity (state, { id }) {
    const cartProduct = state.productsAdded.find(product => product.id === id)
    cartProduct.quantity++
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
