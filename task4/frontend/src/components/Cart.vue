<template>
  <div class="cart">
    <h1>This is cart</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: "Cart"
})
export default class Cart extends Vue {
}
</script>

<style scoped>
</style>
