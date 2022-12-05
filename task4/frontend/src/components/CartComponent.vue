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
          <MinusIcon class="cursor-pointer" @click="cart.decrementItem(item)"/>
          <input class="input-small no-border" type="number" v-model="item.quantity" placeholder=0
                 :style="{width: item.quantity.toString().length + 2 + 'ch'}"
                 @input="cart.calculateTotalQuantityAndValue" hide-spin-buttons>
          <PlusIcon class="cursor-pointer" @click="cart.add(item)"/>
           |
          <TrashCanIcon class="cursor-pointer" @click="cart.removeItem(item)"/>
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

  <form class="needs-validation"
        @submit.prevent="validate"
        @submit="placeOrder"
        id="form" novalidate
        v-show="$route.name === 'cart' && cart.items.length"
  >
    <h1>Dane zamawiającego</h1>
    <div class="input-group has-validation mt-1">
      <input id="name" v-model="name" type="text" class="form-control" placeholder="Imię"
             v-bind:class="{ 'is-invalid': errors.name.length !== 0 }">
      <div class="invalid-feedback" v-if="errors.name">
        <p class="mb-0" v-for="error in errors.name">{{ error }}</p>
      </div>
    </div>
    <div class="input-group has-validation mt-1">
      <input id="email" v-model="email" type="text" class="form-control" placeholder="Email"
             v-bind:class="{ 'is-invalid': errors.email.length !== 0 }">
      <div class="invalid-feedback" v-if="errors.email">
        <p class="mb-0" v-for="error in errors.email">{{ error }}</p>
      </div>
    </div>
    <div class="input-group has-validation mt-1">
      <input id="phone" v-model="phone" type="tel" class="form-control mt-1" placeholder="Numer telefonu"
             v-bind:class="{ 'is-invalid': errors.phone.length !== 0 }">
      <div class="invalid-feedback" v-if="errors.phone">
        <p class="mb-0" v-for="error in errors.phone">{{ error }}</p>
      </div>
    </div>
    <button class="btn btn-primary mt-2" type="submit" :disabled="!cart.items.length">Złóż zamówienie</button>
  </form>
  <div class="alert alert-danger" v-show="!placeOrderSucceed">
    {{ placeOrderSucceedError }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import MinusIcon from 'vue-material-design-icons/Minus.vue'
import TrashCanIcon from 'vue-material-design-icons/TrashCan.vue'
import {Cart} from '@/custom-types/Cart'
import {AxiosResponse} from "axios";

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
      errors: {
        name: [],
        email: [],
        phone: []
      },
      placeOrderSucceed: true,
      placeOrderSucceedError: ''
    }
  },
  methods: {
    validate: function () {
      this.wasValidated = false;
      this.errors = {
        name: [],
        email: [],
        phone: []
      };
      if (!this.name.length) {
        this.errors.name.push('Imię musi być wypełnione.');
      }
      if (!this.email.length) {
        this.errors.email.push('Email musi być wypełniony.');
      }
      if ((this.email.match(/@/g) || []).length !== 1) {
        this.errors.email.push('Email musi zawierać dokładnie 1 znak @.');
      }
      if ((this.email.match(/./g) || []).length < 1) {
        this.errors.email.push('Email musi zawierać znak `.`.');
      }
      if (!this.phone.length) {
        this.errors.phone.push('Numer telefonu musi być wypełniony.');
      }
      if (!this.phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
        this.errors.phone.push('Numer telefonu musi być poprawny.');
      }
      if (!this.errors.phone.length && !this.errors.email.length && !this.errors.name.length) {
          this.wasValidated = true;
      }
    },
    async placeOrder() {
      if (!this.wasValidated) {
        return;
      }
      await this.$axios.post('/orders', {
        products: this.cart.items,
        buyer: {
          username: this.name,
          email: this.email,
          phone: this.phone
        }
      }).then((response: AxiosResponse) => {
          if (response.status == 201) {
            this.$router.push({path: '/thank-you-page'});
            this.cart.clear();
          } else {
            this.placeOrderSucceed = false;
            this.placeOrderSucceed = response.data.err
          }
      });
    }
  }
})
export default class CartComponent extends Vue {
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.no-border{
  border: none;
  background: transparent;
  text-align:center;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
