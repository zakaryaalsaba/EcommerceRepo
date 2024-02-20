<!-- PlaceOrder.vue -->

<template>
  <div>
    <h2>Place Your Order</h2>
    <button @click="handlePlaceOrder">Place Order with Stripe</button>
    <!-- <script async src="https://js.stripe.com/v3/buy-button.js">
    </script>

    <stripe-buy-button buy-button-id="buy_btn_1OfqidKl5JC95HqatcNnZlqE"
      publishable-key="pk_test_51OfkjnKl5JC95HqaQlhuQLpBUUjRd9DMfQEK9jlsOPcrOd1n7j39nmiR0hUnKrBzCMgjVYIHdd5ZWAwpHKGMLMLE008dPXorn3">
    </stripe-buy-button> -->
  </div>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "PlaceOrder",
  methods: {
    async handlePlaceOrder() {
      try {
        // Make a request to your server to create a Checkout Session
        try {
          var sessionId = ''
          //const response = 
          await axios.post(`${apiUrl}/stripeRoutes/checkout`, {
            customerId: 'cus_PUq1BjOA2QTSsw',// 'customer@example.com',
          }).then(response => {
            console.log('Checkout Session ID - data:', response.data.sessionId);
            sessionId = response.data.sessionId;
          }).catch(error => {
              console.error('Error');
              console.error(error);
            });
        } catch (error) {
          console.error('Error :');

          //console.error('Error creating customer:', error.response.data.error);
        }
        // Redirect to Checkout
        const result = await this.$stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        console.error('Error placing order:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here if needed */
</style>