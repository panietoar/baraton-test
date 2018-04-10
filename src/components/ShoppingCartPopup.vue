<template>
  <div class="popup" id="cartPopup">
    <div class="popup__content">
      <a href="#" class="popup__close">&times;</a>
      <ul class="popup__product-list table">
        <li class="popup__product row">
          <span class="popup__name cell">Producto</span>
          <span class="popup__qty cell">Cantidad</span>
          <span class="popup__price cell">Precio Unitario</span>
        </li>
        <li class="popup__product row"
          v-for="product in products"
          :key="product.id">
          <span class="popup__name cell">{{ product.name }}</span>
          <span class="popup__qty cell">{{ product.quantity }}</span>
          <span class="popup__price cell">{{ product.price }}</span>
          <button class="popup__remove cell" @click="removeItem(product)">-</button>
          </li>
      </ul>
      <span class="popup__total-price">Total: ${{ totalPrice }}</span>
      <button class="popup__checkout" type="button" @click="checkoutCart">Checkout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      totalPrice: 'totalCartPrice',
      products: 'productsInCart'
    })
  },
  methods: {
    checkoutCart () {
      this.$store.dispatch('checkout')
    },

    removeItem (product) {
      this.$store.dispatch('removeProduct', product)
    }
  }
}
</script>

<style lang="scss">
@import "../scss/main";

.popup {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 1500;
  background-color: rgba($color-black, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;

  &__content {
    @include centerHorizontalVertical;

    width: 25%;
    background-color: $color-white;
    box-shadow: 0 2rem 4rem rgba($color-black, 0.2);
    border-radius: 3px;
    display: table;
    overflow: hidden;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
    padding: 4rem;
    transition: all 0.5s 0.2s;

    @include respond(tab-port) {
      display: block;
      width: 45%;
    }

    @include respond(phone) {
      width: 65%;
    }
  }

  &__product-list {
    list-style: none;
    font-size: 1.6rem;
    color: $color-grey-dark-3;
    width: 100%;
    margin-bottom: 2rem;
    border-bottom: 1px solid $color-grey-dark-1;
  }

  &__product {
    height: 4rem;
    text-align: center;

    &:first-child .cell{
      font-weight: 700;
    }
  }

  &__remove {
    padding: .2rem 1rem;
    background-color: $color-secondary-dark;
    border: none;
    color: $color-white;
    font-size: 1.9rem;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 .5rem 1rem rgba($color-black, 0.2);

      ~ .cell {
        font-weight: 700;
      }
    }

  }

  &__total-price {
    font-size: 2.1rem;
    color: $color-secondary-dark;
  }

  &__checkout {
    border: none;
    background-color: $color-secondary-dark;
    padding: 1rem;
    border-radius: 2px;
    cursor: pointer;
    color: $color-white;
    float: right;
    transition: all .2s;

    &:hover {
      box-shadow: 0 1rem 3rem rgba($color-black, .3);
      transform: translateY(-2px);
    }
  }

  &:target {
    opacity: 1;
    visibility: visible;
  }

  &:target &__content {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  &__close {

    &:link,
    &:visited {
      color: $color-grey-dark-1;
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      font-size: 3rem;
      text-decoration: none;
      display: inline-block;
      transition: all .2s;
      line-height: 1;
    }

    &:hover {
      color: $color-primary;
    }

  }
}
</style>
