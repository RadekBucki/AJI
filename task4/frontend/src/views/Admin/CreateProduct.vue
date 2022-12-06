<template>
  <ProductForm type="new"/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import ProductForm from '@/components/ProductForm.vue'

@Options({
  name: "CreateProduct",
  components: {
    ProductForm
  }
})
export default class CreateProduct extends Vue {
}
</script>

<style scoped>

</style>