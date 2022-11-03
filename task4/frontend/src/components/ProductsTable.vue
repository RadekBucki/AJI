<template>
  <table>
    <thead>
      <tr>
        <th>Nazwa produktu</th>
        <th>Kategoria</th>
        <th>Opis</th>
        <th>Cena jednostkowa</th>
        <th>Waga jednostkowa</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products">
        <td>{{ product.name }}</td>
        <td>{{ product.category_name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.unit_price }}</td>
        <td>{{ product.unit_weight }}</td>
        <td>
          <button type="submit" id="{{product.sku}}">Add to cart</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import type {AxiosInstance, AxiosResponse} from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

@Options ({
  name: "ProductList",
  data() {
    return {
      products: []
    }
  },
  async mounted() {
    await this.$axios.get('/products')
              .then((response: AxiosResponse) => {
                console.log(response)
                this.products = response.data.data;
              });
  }
})

export default class ProductTable extends Vue {
}
</script>

<style scoped>

</style>