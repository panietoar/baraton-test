<template>
  <div class="list-item" @click="addProductToCart">
    <h3 class="list-item__title">{{ product.name }}</h3>
    <p class="list-item__inventory paragraph">In inventory: <span class="list-item__quantity">{{ product.quantity }}</span></p>
    <p class="list-item__price paragraph">{{ product.price }}</p>
    <div class="list-item__available" :class="{'list-item__available--visible': !product.available}">
      <p class="list-item__sold-out paragraph">sold out</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addProductToCart () {
      if (this.product.available) {
        this.$store.dispatch('addProduct', this.product)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../scss/main";

.list-item {
  position: relative;
  background-image: linear-gradient(175deg, rgba($color-white, .4) 0%, rgba($color-white, .4) 65%, rgba($color-tertiary-dark, .4) 65%);
  padding: 1.5rem;
  height: 18rem;
  width: 18rem;
  margin: 2.5rem;
  text-align: center;
  border-radius: 3px;
  box-shadow: 0 1rem 2rem rgba($color-black, .3);
  cursor: pointer;
  transition: all .2s;

  &:hover {
    transform: translateY(5px) scale(1.03);
    box-shadow: 0 2rem 3rem rgba($color-black, .3);

    .list-item__price {
      color: $color-grey-light-1;
      background-clip: unset;
      margin: auto;
      width: 90%;
      border-radius: 5px;
      box-shadow: 0 .6rem 3rem rgba($color-black, .6);

      &::after {
        content: "\f217";
        font-family: "Font Awesome 5 Free";
        font-weight: 700;
        display: inline-block;
        margin-left: 2px;
      }
    }
  }

  &__title {
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom:  3.5rem;
  }

  &__inventory {
    margin-bottom: 4rem;
  }

  &__quantity {
    font-size: 1.2rem;
    font-weight: 700;
  }

  &__price {
    font-size: 2.4rem;
    background-image: linear-gradient(to right, $color-secondary-dark, $color-secondary-light);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: background-clip .2s;
  }

  &__available {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-grey-dark-1, .75);
    color: $color-grey-dark-3;
    opacity: 0;
    z-index: 10;

    &--visible {
      opacity: 1;
    }
  }

  &__sold-out {
    @include centerHorizontalVertical;
    text-transform: uppercase;
    font-weight: 700;
  }
}
</style>
