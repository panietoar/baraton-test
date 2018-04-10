<template>
  <section class="shopping-cart">
    <header class="shopping-cart__header">Carrito de compras</header>
    <div class="shopping-cart__details">
      <span class="shopping-cart__total-items">{{ totalItems }}</span>
      <span class="shopping-cart__total-price">${{ totalPrice }}</span>
    </div>
    <div class="shopping-cart__actions">
      <a class="shopping-cart__view" href="#cartPopup">Ver carrito &rarr;</a>
      <button class="shopping-cart__checkout" type="button" @click="checkoutCart">Checkout</button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      totalPrice: 'totalCartPrice',
      totalItems: 'productsInCartTotal'
    })
  },
  methods: {
    checkoutCart () {
      this.$store.dispatch('checkout')
    }
  }
}
</script>

<style lang="scss">
@import "../scss/main";

.shopping-cart {
  width: 90%;
  margin: 10rem auto;
  border-radius: 4px;
  overflow: hidden;
  color: $color-grey-dark-3;
  background-color: $color-white;
  box-shadow: 0 .5rem 1rem rgba($color-black, .3);

  &__header {
    background-color: $color-primary-dark;
    padding: 1rem;
    font-size: 1.6rem;
    text-transform: uppercase;
    color: $color-white;
    font-weight: 700;
  }

  &__details {
    padding: 2rem 2rem 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 700;
    position: relative;
  }

  &__total-items {

    &::before {
      content: "Items";
      font-size: 1.1rem;
      font-weight: 400;
      position: absolute;
      top: .5rem;
      left: 1.2rem;
    }
  }

  &__total-price {
    color: $color-secondary-dark;

    &::before {
      content: "Total";
      color: $color-grey-dark-3;
      font-size: 1.1rem;
      font-weight: 400;
      position: absolute;
      top: .5rem;
      right: 2.8rem;
    }
  }

  &__actions {
    border-top: 1px solid $color-grey-light-3;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    position: relative;
  }

  &__view {
    color: $color-primary-dark;
    font-size: 1.4rem;
    padding: .5rem 1rem;
    text-decoration: none;
    border-radius: 2px;
    transition: all .2s;

    &:hover {
      background-color: $color-primary-dark;
      color: $color-white;
    }
  }

  &__checkout {
    border: none;
    background-color: $color-secondary-dark;
    padding: 1rem;
    border-radius: 2px;
    cursor: pointer;
    color: $color-white;
    transition: all .2s;

    &:hover {
      box-shadow: 0 1rem 3rem rgba($color-black, .3);
      transform: translateY(-2px);
    }
  }

}

</style>
