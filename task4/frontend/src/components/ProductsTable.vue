<template>
  <table class="table table-stripped table-hover">
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
        <td>{{ product.unit_price }} zł</td>
        <td>{{ product.unit_weight }} kg</td>
        <td>
          <button class="btn btn-primary" type="button" @click="addToCart(product)">
            <CartPlusIcon />
            <CartIcon />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import CartPlusIcon from 'vue-material-design-icons/CartPlus.vue';
import {Options, Vue} from 'vue-class-component';
import type {AxiosInstance, AxiosResponse} from 'axios';
import {Product} from '@/custom-types/Product'
import {Cart} from "@/custom-types/Cart";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

@Options({
  name: "ProductList",
  components: {
    CartPlusIcon
  },
  props: {
    cart: Cart
  },
  data() {
    return {
      products: [] as Product[],
    }
  },
  methods: {
    addToCart(product: Product) {
      this.cart.addToCart(product)
    }
  },
  async mounted() {
    await this.$axios.get('/products')
        .then((response: AxiosResponse) => {
          this.products = response.data.data;
        });
  }
})

export default class ProductTable extends Vue {
}
</script>

<style scoped>

</style>