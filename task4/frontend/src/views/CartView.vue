<template>
  <Cart/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Cart from '../components/Cart.vue';

@Options({
  name: "CartView",
  components: {
    Cart
  }
})
export default class CartView extends Vue {
}
</script>