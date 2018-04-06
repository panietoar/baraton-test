<template>
  <div id="app">
    <baraton-header/>
    <baraton-products/>
  </div>
</template>

<script>
import Header from './components/Header'
import ProductList from './components/ProductList'

export default {
  name: 'App',
  components: {
    baratonHeader: Header,
    baratonProducts: ProductList
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style lang="scss">
  @import "./scss/main";
</style>
