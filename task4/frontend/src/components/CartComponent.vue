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
          <MinusIcon/>
          {{ item.quantity }}
          <PlusIcon/>
           |
          <TrashCanIcon/>
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
  }
})
export default class CartComponent extends Vue {
}
</script>

<style scoped>
</style>
