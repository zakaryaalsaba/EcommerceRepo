<template>
  <b-container class="bv-example-row my-4 mx-auto">
    <getProductsCom :productIdProp=Number(productId) venderIdProp="-1" />
  </b-container>
</template>

<script>
import getProductsCom from "@/components/global/getProductsCom.vue";

export default {
  name: "ProdsByName",
  components: {
    getProductsCom
  },
  data() {
    return {
      products: [],
      productId: null,
    };
  },
  watch: {
    '$route.params.id'(newId) {
      this.productId = newId;
    },
  },
  created() {
    this.productId = this.$route.params.id;
    console.log(this.productId);
  },
  methods: {
    updateProducts(updatedProducts) {
      this.products = updatedProducts;
    },
  },
};
</script>