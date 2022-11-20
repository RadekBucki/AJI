<template>
  <h1>Produkty</h1>
  <table class="table table-stripped table-hover">
    <thead>
      <tr>
        <th>Nazwa produktu</th>
        <th>Kategoria</th>
        <th>Cena jednostkowa</th>
        <th>Waga jednostkowa</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products">
        <td>{{ product.name }}</td>
        <td>{{ product.category_name }}</td>
        <td>{{ product.unit_price }} zł</td>
        <td>{{ product.unit_weight }} kg</td>
        <td>
          <button class="btn btn-danger" type="button" @click="edit(product)">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {AxiosResponse} from "axios";
import {Product} from "@/custom-types/Product";

@Options({
  name: "Products",
  data() {
    return {
      products: [] as Product[],
    }
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