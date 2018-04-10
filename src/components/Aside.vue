<template>
  <aside class="aside">
    <h2 class="aside__header">tiendas el barat&oacute;n</h2>
    <baraton-accordion/>
    <baraton-cart/>
  </aside>
</template>

<script>
import Accordion from './AsideAccordion'
import ShoppingCart from './ShoppingCart'

export default {
  components: {
    baratonAccordion: Accordion,
    baratonCart: ShoppingCart
  }
}
</script>

<style lang="scss">
@import "../scss/main";

.aside {
  background-color: $color-grey-light-1;
  box-shadow: 0 1rem 4rem rgba($color-black, .3);
  position: fixed;
  width: 15vw;
  height: 100%;
  text-align: center;
  overflow: auto;

  &__header {
    margin: 2rem 0;
    text-transform: uppercase;
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: $color-grey-dark-2;
    text-shadow: 0 .5rem .6rem rgba($color-black, .3);
  }
}
</style>
