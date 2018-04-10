<template>
  <div id="app" class="main">
    <baraton-aside/>
    <baraton-products/>
    <baraton-popup/>
  </div>
</template>

<script>
import Aside from './components/Aside'
import ProductList from './components/ProductList'
import Popup from './components/ShoppingCartPopup'

export default {
  name: 'App',
  components: {
    baratonAside: Aside,
    baratonProducts: ProductList,
    baratonPopup: Popup
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style lang="scss">
  @import "./scss/main";

  .main {
    position: relative;
  }
</style>
