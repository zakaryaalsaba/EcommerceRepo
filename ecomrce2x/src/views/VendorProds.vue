<template>
  <b-container class="bv-example-row my-4 mx-auto">

    <DepartmentsButtonsCom titleProp="All Departments" />
    <getProductsCom :venderIdProp=venderId />
  </b-container>
</template>

<script>
import getProductsCom from "@/components/global/getProductsCom.vue";
import DepartmentsButtonsCom from "@/components/global/DepartmentsButtonsCom.vue";


export default {
  name: "VendorProds",
  components: {
    getProductsCom,
    DepartmentsButtonsCom
  },
  data() {
    return {
      venderIdProp: Number,
    };
  },
  created() {
    this.venderId = this.$route.params.id;
    console.log('this.venderId = ' + this.venderId)

  },
};
</script>