<template>
  <div class="accordion-menu">
    <div class="accordion-menu__item"
      :style="indent"
      @click="toggleSublevel"
      :class="{'accordion-menu__item--selected': id === selectedId}">
      {{ name }}
      <span class="accordion-menu__action" :style="indentReverse" v-if="!showSublevel && sublevels">+</span>
      <span class="accordion-menu__action" :style="indentReverse" v-if="showSublevel && sublevels">-</span>
    </div>
    <accordion-item
      v-if="showSublevel"
      v-for="sublevel in sublevels"
      :sublevels="sublevel.sublevels"
      :name="sublevel.name"
      :key="sublevel.id"
      :id="sublevel.id"
      :depth="depth + 1"/>
  </div>
</template>

<script>
export default {
  name: 'accordion-item',
  props: {
    name: {
      type: String
    },
    sublevels: {
      type: Array
    },
    depth: {
      type: Number
    },
    id: {
      type: Number
    }
  },
  data () {
    return {
      showSublevel: false
    }
  },
  computed: {
    indent () {
      return { transform: `translate(${this.depth * 1}rem)` }
    },
    indentReverse () {
      return { transform: `translate(-${this.depth * 1}rem)` }
    },
    isRootDepth () {
      return this.depth === 0
    },
    selectedId () {
      return this.$store.getters.selectedId
    }
  },
  methods: {
    toggleSublevel () {
      this.showSublevel = !this.showSublevel
      this.$store.dispatch('selectId', this.id)
    }
  }
}
</script>

<style lang="scss">
@import "../scss/main";

.accordion-menu {

  &__item {
    padding: .8rem 1.6rem;
    text-align: left;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all .2s;
    float: left;
    width: 100%;

    &:hover {
      font-weight: 900;
    }

    &--selected {
      color: $color-tertiary-dark;
      font-weight: 900;
    }
  }

  &__action {
    float: right;
    font-size: 2rem;
    font-weight: 900;
    line-height: 1
  }

}
</style>
