<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-2" v-show="!$route.path.includes('admin')">
    <a class="navbar-brand" href="#">Vue&Express Shop</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Strona główna</router-link>
      </li>
      <li class="nav-item"
          @mouseover="showCart=($route.name !== 'cart')"
          @mouseleave="showCart=false">
        <router-link class="nav-link" to="/cart" @mousedown="showCart=false">
          <CartIcon/>
          ({{ cart.totalQuantity }})
        </router-link>
        <div class="cart position-absolute bg-light p-4 shadow-lg rounded-3" v-show="showCart">
          <CartComponent :cart="cart"/>
        </div>
      </li>
    </ul>
  </nav>

  <router-view :cart="cart"/>
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
import CartComponent from "@/components/CartComponent.vue";

@Options({
  name: "App",
  components: {
    CartIcon,
    CartComponent
  },
  data() {
    return {
      cart: new Cart() as Cart,
      showCart: false
    }
  }
})

export default class App extends Vue {
}
</script>
