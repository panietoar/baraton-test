<template>
  <section class="accordion">
    <header class="accordion__header">Categor&iacute;as</header>
    <baraton-accordion-menu
      :sublevels="categories"
      :id="0"
      :depth="-1"/>
  </section>
</template>

<script>
import baratonService from '../lib/baratonService'
import AccordionMenu from './AsideAccordionMenu'

export default {
  components: {
    baratonAccordionMenu: AccordionMenu
  },
  data () {
    return {
      categories: []
    }
  },
  beforeMount () {
    baratonService.getCategories().then(response => { this.categories = response.data.categories })
  }
}
</script>

<style lang="scss">
@import "../scss/main";

.accordion {
  width: 90%;
  margin: auto;
  border-radius: 4px;
  overflow: hidden;
  color: $color-grey-dark-3;
  background-color: $color-white;
  box-shadow: 0 .5rem 1rem rgba($color-black, .3);

  &__header {
    background-color: $color-tertiary-dark;
    padding: 1rem;
    font-size: 1.6rem;
    text-transform: uppercase;
    color: $color-white;
    font-weight: 700;
  }

}
</style>
