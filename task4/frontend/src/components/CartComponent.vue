<template>
  <table class="table table-stripped table-hover">
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
        <td>{{ item.unit_price }}</td>
        <td>
          <MinusIcon/>
          1
          <PlusIcon/>
           |
          <TrashCanIcon/>
        </td>
        <td>{{ item.unit_price * item.quantity }}</td>
      </tr>
    </tbody>
    <tfoot class="table-success">
      <tr>
        <td>SUMA</td>
        <td>123</td>
        <td>2</td>
        <td>246</td>
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
  data() {
    return {
      cart: new Cart() as Cart
    }
  },
})
export default class CartComponent extends Vue {
}
</script>

<style scoped>
</style>
