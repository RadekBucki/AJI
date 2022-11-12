<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-2">
    <a class="navbar-brand" href="#">Vue&Express Shop</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/cart">Cart <CartIcon /></router-link>
      </li>
    </ul>
  </nav>

  <div class="container mt-4">
    <router-view />
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
@Options({
  name: "App",
  components: {
    CartIcon
  },
})

export default class App extends Vue {
}
</script>
