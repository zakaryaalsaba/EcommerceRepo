<template>
  <b-button @click="addToCartHandler" variant="outline-success">
    <b-icon icon="cart-plus"></b-icon> Add to Cart
  </b-button>
</template>
  
<script>
import axios from 'axios';
import store from '../../store';
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "AddToCartCom",
  props: {
    productId: Number,
    priceProp: Number,
    QuantityPrp: Number
  },
  methods: {
    async addToCartHandler() {
      const loggedInUser = store.state.loggedInUser;
      console.log(this.productId + ' added to cart');
      //console.log(loggedInUser.user.Id)
      await axios.post(`${apiUrl}/carts`,
        {
          "UserID": loggedInUser.user.Id,
          "ProductID": this.productId,
          "Quantity": 1,
          "Price": this.priceProp
        },
        {
          headers: {
            'Content-type': 'application/json',
          }
        }).then(response => {
          console.log(response);
          this.$root.$emit('header-getCart');
          this.$root.$emit('header-showAlert');
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/main.scss";

// .cart {
//   color: white;
//   font-size: 1.7rem;
// }

// .text-secondary {
//   --bs-text-opacity: 1;
// }
</style>