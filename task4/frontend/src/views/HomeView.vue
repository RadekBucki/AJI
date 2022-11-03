<template>
  <div class="home">
    <ProductTable />
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ProductTable from "@/components/ProductsTable.vue";

@Options({
  components: {
    ProductTable
  }
})

export default class HomeView extends Vue {
}
</script>
