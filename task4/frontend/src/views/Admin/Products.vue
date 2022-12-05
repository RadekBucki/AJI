<template>
  <div class="container mt-4">
    <ProductTable/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import ProductTable from "@/components/ProductsTable.vue";

@Options({
  name: "Products",
  components: {
    ProductTable
  }
})
export default class Products extends Vue {
}
</script>

<style scoped>

</style>
