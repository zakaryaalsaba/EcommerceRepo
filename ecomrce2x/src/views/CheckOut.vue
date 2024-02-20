<template>
  <b-container fluid class="pt-4">
    <b-row>
      <b-col md="3">
      </b-col>
      <b-col md="3">
        <h4>Checkout</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3"></b-col>
      <b-col md="5">
        <StripeComponent />
      </b-col>
      <b-col md="3">
        <OrderSummaryCom :subtotal="50.00" :shippingEstimate="10.00" :taxEstimate="5.00" :total="50.0"
          :showCheckOut="false" :showContinueShopping="false" />
      </b-col>
    </b-row>
  </b-container>
</template>
  
<script>
import StripeComponent from "@/components/global/StripeComponent.vue";
import OrderSummaryCom from "@/components/global/OrderSummaryCom.vue";

export default {
  name: "CheckOut",
  components: {
    StripeComponent,
    OrderSummaryCom
  },
  methods: {
    GetDoorDash(){
      console.log("sometext");
    }
  }
};
</script>
  
<style scoped>
/* Add your component-specific styles here if needed */
</style>