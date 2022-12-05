<template>
  <div class="container mt-4">
    <ProductTable :cart="cart" />
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {AxiosResponse} from "axios";
import {Product} from "@/custom-types/Product";
import ProductTable from "@/components/ProductsTable.vue";

@Options({
  name: "Products",
  data() {
    return {
      products: [] as Product[],
    }
  },
  components: {
    ProductTable
  },
  methods: {
    edit(product: Product) {
      this.$router.push({path: '/admin/dashboard/products/edit/' + product.sku});
    }
  },
  async mounted() {
    await this.$axios.get('/products')
        .then((response: AxiosResponse) => {
          this.products = response.data.data;
        });
  }
})
export default class Products extends Vue {
}
</script>

<style scoped>

</style>
