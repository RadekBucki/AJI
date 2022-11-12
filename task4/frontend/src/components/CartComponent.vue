<template>
  <h1>Koszyk</h1>
  <table class="table table-stripped table-hover mt-4">
    <thead class="table-primary">
      <tr>
        <td>Nazwa</td>
        <td>Cena</td>
        <td>Ilość</td>
        <td>Razem</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cart.items">
        <td>{{ item.name }}</td>
        <td>{{ item.unit_price }} zł</td>
        <td>
          <MinusIcon @click="cart.decrementItem(item)"/>
          {{ item.quantity }}
          <PlusIcon @click="cart.add(item)"/>
           |
          <TrashCanIcon @click="cart.removeItem(item)"/>
        </td>
        <td>{{ item.unit_price * item.quantity }} zł</td>
      </tr>
    </tbody>
    <tfoot class="table-success">
      <tr>
        <td colspan="2">SUMA</td>
        <td>{{ cart.totalQuantity }}</td>
        <td>{{ cart.totalValue }} zł</td>
      </tr>
    </tfoot>
  </table>

  <form class="needs-validation" @submit.prevent="validate" id="form" novalidate
        v-bind:class="{ 'was-validated': wasValidated }"
        v-show="$route.name === 'cart'"
  >
    <h1>Dane zamawiającego</h1>
    <div class="input-group has-validation mt-1">
      <input id="name" v-model="name" type="text" class="form-control" placeholder="Imię"
             v-bind:class="{ 'is-invalid': nameError }">
      <div class="invalid-feedback" v-if="errors.name">
        <p class="mb-0" v-for="error in errors.name">{{ error }}</p>
      </div>
    </div>
    <div class="input-group has-validation mt-1">
      <input id="email" v-model="email" type="text" class="form-control" placeholder="Email"
             v-bind:class="{ 'is-invalid': emailError }">
      <div class="invalid-feedback" v-if="errors.email">
        <p class="mb-0" v-for="error in errors.email">{{ error }}</p>
      </div>
    </div>
    <div class="input-group has-validation mt-1">
      <input id="phone" v-model="phone" type="tel" class="form-control mt-1" placeholder="Numer telefonu"
             v-bind:class="{ 'is-invalid': phoneError }">
      <div class="invalid-feedback" v-if="errors.phone">
        <p class="mb-0" v-for="error in errors.phone">{{ error }}</p>
      </div>
    </div>
    <button class="btn btn-primary mt-2" type="submit">Złóż zamówienie</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import MinusIcon from 'vue-material-design-icons/Minus.vue'
import TrashCanIcon from 'vue-material-design-icons/TrashCan.vue'
import {Cart} from '@/custom-types/Cart'

@Options({
  name: "CartComponent",
  components: {
    PlusIcon,
    MinusIcon,
    TrashCanIcon
  },
  props: {
    cart: Cart
  },
  data() {
    return {
      wasValidated: false,
      name: '',
      email: '',
      phone: '',
      nameError: false,
      emailError: false,
      phoneError: false,
      errors: {
        name: [],
        email: [],
        phone: []
      }
    }
  },
  methods: {
    validate: function () {
      this.wasValidated = false;
      this.nameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.errors = {
        name: [],
        email: [],
        phone: []
      };
      if (!this.name.length) {
        this.nameError = true;
        this.errors.name.push('Imię musi być wypełnione.');
      }
      if (!this.email.length) {
        this.emailError = true;
        this.errors.email.push('Email musi być wypełniony.');
      }
      if ((this.email.match(/@/g) || []).length !== 1) {
        this.emailError = true;
        this.errors.email.push('Email musi zawierać dokładnie 1 znak @.');
      }
      if ((this.email.match(/./g) || []).length < 1) {
        this.emailError = true;
        this.errors.email.push('Email musi zawierać znak `.`.');
      }
      if (!this.phone.length) {
        this.phoneError = true;
        this.errors.phone.push('Numer telefonu musi być wypełniony.');
      }
      this.wasValidated = true;
    }
  }
})
export default class CartComponent extends Vue {
}
</script>

<style scoped>
</style>
