<template>
  <section class="product-list">
    <select class="product-list__filter" v-model="sortMode">
      <option value="priceMin">Price - Min to Max</option>
      <option value="priceMax">Price - Max to Min</option>
      <option value="quantityMin">Quantity - Min to Max</option>
      <option value="quantityMax">Quantity - Max to Min</option>
      <option value="availability">Availability</option>
    </select>
    <div class="product-list__grid">
      <transition-group name="item-list">
          <baraton-product-item
            v-for="product in currentProducts"
            :key="product.id"
            :product="product"/>
      </transition-group>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { extractNumericPrice } from '../lib/priceUtils'

import ProductItem from './ProductListItem'

export default {
  components: {
    baratonProductItem: ProductItem
  },
  data () {
    return {
      sortMode: 'priceMin'
    }
  },
  computed: {
    ...mapGetters({
      products: 'categoryProducts'
    }),
    currentProducts () {
      // eslint-disable-next-line
      return this.products.sort(this.sortStrategy(this.sortMode))
    }
  },
  methods: {
    sortStrategy (mode) {
      let strategy

      if (mode === 'priceMin') {
        strategy = (a, b) => {
          return extractNumericPrice(a.price) - extractNumericPrice(b.price)
        }
      }

      if (mode === 'priceMax') {
        strategy = (a, b) => {
          return extractNumericPrice(b.price) - extractNumericPrice(a.price)
        }
      }

      if (mode === 'quantityMin') {
        strategy = (a, b) => {
          return a.quantity - b.quantity
        }
      }

      if (mode === 'quantityMax') {
        strategy = (a, b) => {
          return b.quantity - a.quantity
        }
      }

      if (mode === 'availability') {
        strategy = (a, b) => {
          if (a.available) {
            return -1
          } else if (b.available) {
            return 1
          } else {
            return 0
          }
        }
      }

      return strategy
    }
  }
}
</script>

<style lang="scss">
  .product-list {
    padding: 10rem;
    float: right;
    width: 85vw;

    &__grid > span{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  .item-list-move {
    transition: transform 1s;
  }
</style>
