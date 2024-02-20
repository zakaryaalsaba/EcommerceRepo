<template>
  <div>
    <b-card title="Order Summary" class="mb-4">
      <b-row>&nbsp;</b-row>
      <b-row>
        <b-col md="8">
          Subtotal
        </b-col>
        <b-col md="4" style="white-space: nowrap;">
          ${{ subtotal }}
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="8">
          Shipping estimate
          <b-icon icon="info-circle" scale="1"></b-icon>
        </b-col>
        <b-col md="4" style="white-space: nowrap;">
          ${{ shippingEstimate }}
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="8">
          Tax estimate
          <b-icon icon="info-circle" scale="1"></b-icon>
        </b-col>
        <b-col md="4" style="white-space: nowrap;">
          ${{ taxEstimate }}
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="8">
          <b>Order Total</b>
        </b-col>
        <b-col md="4" style="white-space: nowrap;">
          <b style="color: #fa6338;">${{ total }}</b>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col md="6" class="mb-2">
          <b-button v-if="showCheckOut" to="/CheckOut" variant="success" block class="custom-btn">Proceed To
            Checkout</b-button>
        </b-col>
        <b-col md="6">
          <b-button v-if="showContinueShopping" to="/AllVenders" variant="success" class="custom-btn" block>Continue
            Shopping</b-button>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col>
          <b-button variant="success" @click="GetDoorDash">Door Dash</b-button>
        </b-col>
      </b-row> -->
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "OrderSummaryCom",
  props: {
    subtotal: String,
    shippingEstimate: String,
    taxEstimate: String,
    total: String,
    showCheckOut: Boolean,
    showContinueShopping: Boolean,
    myCart: Array,
  },
  methods: {
    GetDoorDash() {
      console.log("sometext");
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImRkLXZlciI6IkRELUpXVC1WMSJ9.eyJhdWQiOiJkb29yZGFzaCIsImlzcyI6IjRmMjVjZTA5LTI4YWUtNGViMS1hNjczLWYwMjgyZjRlYTdhMyIsImtpZCI6ImE0ZTczMDBhLWNlM2EtNDljOC04ZjYxLWQ1NGYxYzg4MjIwNCIsImV4cCI6MTcwNzUzMDUzNSwiaWF0IjoxNzA3NTMwMjM1fQ.PQWcqf6MK26T6S-Ia3UEbBkYvgQ4kWKaMZKZqX_6-yc';
      const body = JSON.stringify({
        external_delivery_id: 'D-12345',
        pickup_address: '901 Market Street 6th Floor San Francisco, CA 94103',
        pickup_business_name: 'Wells Fargo SF Downtown',
        pickup_phone_number: '+16505555555',
        pickup_instructions: 'Enter gate code 1234 on the callbox.',
        dropoff_address: '901 Market Street 6th Floor San Francisco, CA 94103',
        dropoff_business_name: 'Wells Fargo SF Downtown',
        dropoff_phone_number: '+16505555555',
        dropoff_instructions: 'Enter gate code 1234 on the callbox.',
        order_value: 1999,
      })

      axios
        .post('https://openapi.doordash.com/drive/v2/deliveries', body, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080'
          },
        })
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
