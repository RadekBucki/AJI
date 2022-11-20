<template>
    <div class="position-absolute top-50 start-50 translate-middle" @keyup.enter="signIn">
      <div class="shadow-lg p-4 rounded-5">
        <h1 class="lead">Logowanie do panelu administracyjnego</h1>
        <form v-on:submit.prevent="signIn">

          <div class="form-group mx-2 my-3">
            <label class="mb-2">Nazwa użytkownika</label>
            <input type="text"
                   class="form-control rounded-5"
                   placeholder="Nazwa użytkownika"
                   v-model="signInData.username">
          </div>

          <div class="form-group mx-2 my-3">
            <label class="mb-2">Hasło</label>
            <input type="password"
                   class="form-control rounded-5"
                   placeholder="********"
                   v-model="signInData.password">
          </div>

          <div class="alert alert-danger mt-2" v-show="signInData.isError">
            Niepoprawna nazwa użytkownika lub hasło.
          </div>

          <button class="btn btn-primary w-100 rounded-5" type="button" @click="signIn">Zaloguj się</button>
        </form>
      </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {AxiosError, AxiosResponse} from "axios";

@Options({
  name: "Login",
  data() {
    return {
      signInData: {
        username: '',
        password: '',
        isError: false
      }
    }
  },
  methods: {
    async signIn() {
      this.isError = false;
      await this.$axios.post('/login', {
        user: this.signInData.username,
        password: this.signInData.password
      }).then((response: AxiosResponse) => {
        console.log(response)
        if (response.status == 200) {
          localStorage.setItem('token', response.data.data.token);
          this.$router.push({path: '/admin/dashboard'});
        } else {
          this.signInData.isError = true;
        }
      }).catch((error: AxiosError) => {
          console.log(error);
          this.signInData.isError = true
      });
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$router.push({path: '/admin/dashboard'});
    }
  }
})
export default class Login extends Vue {
}
</script>

<style scoped>

</style>