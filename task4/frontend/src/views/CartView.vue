<template>
  <CartComponent :cart="cart"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CartComponent from '../components/CartComponent.vue';
import {Cart} from "@/custom-types/Cart";

@Options({
  name: "CartView",
  components: {
    CartComponent
  },
  props: {
    cart: Cart
  }
})
export default class CartView extends Vue {
}
</script>