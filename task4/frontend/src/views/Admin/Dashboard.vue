<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/admin/dashboard" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">Vue&Express Shop Admin Panel</span>
          </a>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <router-link class="nav-link align-middle px-0 text-light" to="/admin/dashboard">Start</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link align-middle px-0 text-light" to="/admin/dashboard/products">Produkty</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link align-middle px-0 text-light" to="/admin/dashboard/orders">Zamówienia</router-link>
            </li>
          </ul>
          <hr>
          <div class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
               id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/favicon.ico" alt="Ikona użytkownika" width="30" height="30" class="rounded-circle">
              <span class="d-none d-sm-inline mx-1">Admin</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <a class="dropdown-item btn" @click="signOut">Wyloguj się</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col py-3" v-show="$route.path !== '/admin/dashboard'">
        <router-view/>
      </div>
      <div class="col py-3" v-show="$route.path === '/admin/dashboard'">
        <h1>Strona główna</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  name: "Dashboard",
  methods: {
    signOut() {
      localStorage.removeItem('token');
      this.$router.push({path: '/admin'});
    }
  }
})
export default class Dashboard extends Vue {
}
</script>

<style scoped>

</style>