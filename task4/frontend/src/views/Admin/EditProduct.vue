<template>
  <form @keyup.enter="updateProduct">
    <div class="d-flex justify-content-sm-between">
      <h1>Edytujesz Produkt: {{ product.name ?? sku }}</h1>
      <router-link to="/admin/dashboard/products" class="btn btn-lg btn-secondary">Wróć</router-link>
      <button type="button" @click="updateProduct" class="btn btn-lg btn-primary">Zapisz</button>
    </div>
    <div class="form-group">
      <label for="price">Nazwa</label>
      <input type="text" class="form-control" v-model="product.name">
    </div>
    <div class="form-group">
      <label for="text">SKU</label>
      <input type="text" class="form-control" v-model="product.sku">
    </div>
    <div class="form-group">
      <label for="category">Kategoria</label>
      <select class="form-control" id="category" v-model="product.category_code">
        <option v-for="category in categories" :value="category.category_code">{{ category.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="price">Cena</label>
      <input type="number" class="form-control" step="0.01" v-model="product.unit_price">
    </div>
    <div class="form-group">
      <label for="price">Waga</label>
      <input type="number" class="form-control" step="any" v-model="product.unit_weight">
    </div>
    <div class="form-group">
      <label for="description">Opis</label>
      <textarea class="form-control" id="description" rows="3">{{ product.description }}</textarea>
    </div>
  </form>
  <div class="alert alert-danger mt-2" v-show="isError">
    <span v-for="error in errors">{{ error.message }}</span>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {AxiosError, AxiosResponse} from "axios";
import {Product} from "@/custom-types/Product";
import {Category} from "@/custom-types/Category";
import {Error, ErrorResponse} from "@/custom-types/ErrorResponse";

@Options({
  name: "EditProduct",
  props: {
    sku: '' as string
  },
  data() {
    return {
      product: {} as Product,
      categories: [] as Category[],
      isError: false,
      errors: [] as Error[]
    }
  },
  methods: {
    async updateProduct() {
      this.isError = false;
      const product = {...this.product};
      delete product.category_name;
      await this.$axios.put('/products/' + this.sku, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` ?? '',
        }
      }).then((response: AxiosResponse) => {
        this.product = response.data.data;
        this.$router.push({path: '/admin/dashboard/products/' + this.product.sku})
      }).catch((reason: AxiosError) => {
        this.isError = true;
        this.errors = (reason.response?.data as ErrorResponse).errors;
      });
    }
  },
  async mounted() {
    await this.$axios.get('/products/' + this.sku)
      .then((response: AxiosResponse) => {
        this.product = response.data.data;
    });
    await this.$axios.get('/categories/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` ?? '',
      }
    }).then((response: AxiosResponse) => {
      this.categories = response.data.data;
    });
  }
})
export default class EditProduct extends Vue {
}
</script>

<style scoped>

</style>