<template>
  <ProductForm :sku="sku" type="edit"/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import ProductForm from '@/components/ProductForm.vue'

@Options({
  name: "EditProduct",
  props: {
    sku: '' as string
  },
  components: {
    ProductForm
  }
})
export default class EditProduct extends Vue {
}
</script>

<style scoped>

</style>