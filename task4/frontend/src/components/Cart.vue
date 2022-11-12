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
      <tr v-for="item in items">
        <td>{{ item.name }}</td>
        <td>{{ item.unit_price }}</td>
        <td>
          <MinusIcon/>
          1
          <PlusIcon/>
           |
          <TrashCanIcon/>
        </td>
        <td>{{ item.unit_price * 1 }}</td>
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

@Options({
  name: "Cart",
  components: {
    PlusIcon,
    MinusIcon,
    TrashCanIcon
  },
  data() {
    return {
      items: []
    }
  },
  async mounted() {
    if (!localStorage.cart) {
      return;
    }
    const cart = JSON.parse(localStorage.cart);
    if (!cart.items) {
      return;
    }
    this.items = cart.items;
  }
})
export default class Cart extends Vue {
}
</script>

<style scoped>
</style>
