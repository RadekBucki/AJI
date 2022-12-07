<template>
  <div class="d-flex justify-content-sm-between" v-if="$route.path.includes('admin')">
    <h1>Produkty</h1>
    <router-link to="/admin/dashboard/products/new" class="btn btn-lg btn-success">Utwórz nowy</router-link>
  </div>
  <div class="form-group">
    <label for=inputTitle>Nazwa</label>
    <input type="text" id=inputTitle v-model="filters.name" v-on:keyup.enter="search" v-on:keyup.esc="clear('name')"
           class="form-control" placeholder="Podaj szukaną nazwę"/>
  </div>
  <div class="form-group">
    <label for="category">Kategoria</label>
    <select class="form-control" id="category" v-model="filters.category_code">
      <option v-for="category in categoryOptions" :value="category.category_code">{{ category.name }}</option>
    </select>
  </div>
  <div class="form-group">
    <label for="category">Sortowanie</label>
    <select class="form-control" id="category" v-model="filters.sortingOptionCode">
      <option v-for="sortingOption in sortingOptions" :value="sortingOption.optionCode">{{
          sortingOption.name
        }}
      </option>
    </select>
  </div>
  <div class="form-group mt-1">
    <input type="button" class="btn btn-primary col-sm-12" value="Szukaj" @click="search"/>
  </div>
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
    <tr v-for="product in filteredProducts">
      <td>{{ product.name }}</td>
      <td>{{ product.category_name }}</td>
      <td>{{ product.description }}</td>
      <td>{{ product.unit_price }} zł</td>
      <td>{{ product.unit_weight }} kg</td>
      <td>
        <button class="btn btn-primary" type="button" @click="cart.add(product)"
                v-show="!$route.path.includes('admin')">
          <CartPlusIcon/>
        </button>
        <button class="btn btn-danger" type="button" @click="edit(product)" v-show="$route.path.includes('admin')">
          Edit
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
import {Category} from "@/custom-types/Category";
import {AxiosError} from "axios";
import {SortingOption} from "@/custom-types/SortingOption";

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
  methods: {
    edit(product: Product) {
      this.$router.push({path: '/admin/dashboard/products/edit/' + product.sku});
    },
    search() {
      let allProducts = this.allProducts;
      let filters = this.filters;
      this.filteredProducts = allProducts.filter((product: Product) => {
        return (product.name === '' || product.name.toLowerCase().includes(filters.name.toLowerCase()))
            && (filters.category_code === '' || product.category_code === filters.category_code)
      });
      if (filters.sortingOptionCode === '') {
        return;
      }
      const sortBy = this.filters.sortingOptionCode.split('-');
      sortBy[1] = sortBy[1] === 'asc' ? 1 : -1;
      this.filteredProducts = this.filteredProducts.sort((product1: any, product2: any) => {
        return ((product1[sortBy[0]] > product2[sortBy[0]]) ? 1 : -1) * sortBy[1];
      });
    },
    clear(stringToClear: string) {
      this.filters[stringToClear] = '';
      this.search();
    }
  },
  props: {
    cart: Cart
  },
  data() {
    return {
      allProducts: [] as Product[],
      filteredProducts: [] as Product[],
      filters: {
        name: "",
        category_code: "",
        sortingOptionCode: ""
      },
      categoryOptions: [] as Category[],
      sortingOptions: [
        {optionCode: '', name: 'Wybierz kolejność sortowania'},
        {optionCode: 'name-asc', name: 'Nazwa A-Z'},
        {optionCode: 'name-desc', name: 'Nazwa Z-A'},
        {optionCode: 'unit_price-asc', name: 'Cena od najmniejszej'},
        {optionCode: 'unit_price-desc', name: 'Cena od największej'},
        {optionCode: 'unit_weight-asc', name: 'Waga od najmniejszej'},
        {optionCode: 'unit_weight-desc', name: 'Waga od największej'},
      ] as SortingOption[]
    }
  },
  async mounted() {
    await this.$axios.get('/products')
        .then((response: AxiosResponse) => {
          this.filteredProducts = response.data.data;
          this.allProducts = response.data.data;
        });
    await this.$axios.get('/categories/')
        .then((response: AxiosResponse) => {
          this.categoryOptions = response.data.data;
          this.categoryOptions.unshift({
            category_code: "",
            name: "Wybierz kategorię"
          });
        }).catch((reason: AxiosError) => {
          this.categoryOptions = [];
        });
  }
})

export default class ProductTable extends Vue {
}
</script>

<style scoped>

</style>
