<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import type {AxiosInstance} from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

@Options({
  components: {
    HelloWorld,
  },
  mounted() {
    this.$axios.get('/products')
        .then((response: Response) => console.log(response))
        .catch((error: Error) => console.log(error))
  }
})
export default class HomeView extends Vue {}
</script>
