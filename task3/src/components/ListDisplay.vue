<template>
  <h2>{{ title }}</h2>
  <ol>
    <li v-for="item in items.slice(0,counter)">{{ item }}</li>
  </ol>
  <button class="btn btn-outline-info" @click="showMore()" v-show="items.length > counter">
    Pokaż więcej<br />
    <i class="bi bi-chevron-down"></i>
  </button>
</template>

<script>
export default {
  name: "ListDisplay",
  props: {
    title: String,
    items: Array
  },
  data() {
    return {
      counter: 10
    }
  },
  methods: {
    showMore() {
      this.counter += 10;
    }
  }
}
</script>

<style scoped>

</style>