<template>
  <h1>Zamówienia</h1>
  <h2>Filtry</h2>
  <select class="form-select" aria-label="Stan zamówienia" v-model="selectedStatus" @change="filterByStatus()">
    <option selected value="none">Stan zamówienia</option>
    <option v-for="status in ordersStatuses" :value="status.code">{{ status.name }}</option>
  </select>
  <table class="table table-stripped table-hover">
    <thead>
      <tr>
        <th>Data zatwierdzenia</th>
        <th>Wartość</th>
        <th>Produkty</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders">
        <td>{{ (new Date(order.creation_date)).toLocaleString() }}</td>
        <td>
          {{
            order.products
                 .reduce(
                (accumulator, product) => accumulator + product.quantity * product.price,
                0
            )
          }} zł
        </td>
        <td>
          <span v-for="product in order.products">{{ product.name }} - {{ product.quantity }}<br></span>
        </td>
        <td>
          <button class="btn btn-danger" type="button" @click="edit(product)">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="alert alert-danger mt-2" v-show="isError">
    <span v-for="error in errors">{{ error.message }}<br></span>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Order} from "../../custom-types/Order";
import {AxiosError, AxiosResponse} from "axios";
import {Error, ErrorResponse} from "@/custom-types/ErrorResponse";
import {OrderStatus} from "@/custom-types/OrderStatus";

@Options({
  name: "Orders",
  data() {
    return {
      orders: [] as Order[],
      ordersStatuses: [] as OrderStatus[],
      selectedStatus: 'none',
      isError: false,
      errors: [] as Error[]
    }
  },
  methods: {
    edit(order: Order) {
      alert('edit')
    },
    async getAllOrders() {
      await this.$axios.get('/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` ?? '',
        }
      }).then((response: AxiosResponse) => {
        this.orders = response.data.data;
      }).catch((reason: AxiosError) => {
        this.isError = true;
        this.errors = (reason.response?.data as ErrorResponse).errors;
      });

      await this.$axios.get('/status', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` ?? '',
        }
      }).then((response: AxiosResponse) => {
        this.ordersStatuses = response.data.data;
      }).catch((reason: AxiosError) => {
        this.isError = true;
        this.errors = (reason.response?.data as ErrorResponse).errors;
      });
    },
    async filterByStatus() {
      this.isError = false;
      if (this.selectedStatus === 'none') {
        await this.getAllOrders();
        return;
      }
      await this.$axios.get('/orders/status/' + this.selectedStatus, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` ?? '',
        }
      }).then((response: AxiosResponse) => {
        this.orders = response.data.data;
      }).catch((reason: AxiosError) => {
        this.isError = true;
        this.errors = (reason.response?.data as ErrorResponse).errors;
      });
    }
  },
  mounted: async function () {
    this.isError = false;
    await this.getAllOrders();

    await this.$axios.get('/status', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` ?? '',
      }
    }).then((response: AxiosResponse) => {
      this.ordersStatuses = response.data.data;
    }).catch((reason: AxiosError) => {
      this.isError = true;
      this.errors = (reason.response?.data as ErrorResponse).errors;
    });
  }
})
export default class Orders extends Vue {
}
</script>

<style scoped>

</style>