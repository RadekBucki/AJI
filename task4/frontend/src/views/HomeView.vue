<template>
  <div class="container mt-4">
    <ProductTable :cart="cart" />
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ProductTable from "@/components/ProductsTable.vue";
import {Cart} from "@/custom-types/Cart";

@Options({
  components: {
    ProductTable
  },
  props: {
    cart: Cart
  }
})

export default class HomeView extends Vue {
}
</script>
