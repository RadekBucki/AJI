<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-2">
    <a class="navbar-brand" href="#">Vue&Express Shop</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/cart"><CartIcon /> ({{ cart.totalQuantity }})</router-link>
      </li>
    </ul>
  </nav>

  <div class="container mt-4">
    <router-view :cart="cart"/>
  </div>
</template>

<style>
.router-link-active {
  color: white !important;
}
</style>

<script lang="ts">
import CartIcon from 'vue-material-design-icons/Cart.vue';
import {Options, Vue} from 'vue-class-component';
import {Cart} from "@/custom-types/Cart";
@Options({
  name: "App",
  components: {
    CartIcon
  },
  data() {
    return {
      cart: new Cart() as Cart
    }
  }
})

export default class App extends Vue {
}
</script>
