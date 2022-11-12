<template>
  <CartComponent/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CartComponent from '../components/CartComponent.vue';

@Options({
  name: "CartView",
  components: {
    CartComponent
  }
})
export default class CartView extends Vue {
}
</script>