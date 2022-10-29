<template>
  <h2>{{ title }}</h2>
  <ol>
    <li v-for="item in items.slice(0,counter)">{{ item }}</li>
  </ol>
  <button class="btn btn-outline-info" @click="showMore()" v-show="items.length > counter">
    Pokaż więcej<br/>Wyświetlane pierwsze {{counter}} z {{items.length}}<br />
    <i class="bi bi-chevron-down"></i>
  </button>
</template>

<script>
export default {
  name: "List",
  props: {
    title: String,
    items: Array
  },
  data() {
    return {
      counter: 5
    }
  },
  methods: {
    showMore() {
      this.counter += 5;
    }
  }
}
</script>
