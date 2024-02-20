<template>
  <b-button @click="addToFavoriteHandler" variant="none" class="border-0 pe-0">
    <b-icon icon="heart" variant="secondary" class="icon-heart"></b-icon>
  </b-button>
</template>
  
<script>
// import router from "../router";
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;
//import { eventHub } from '@/main'
export default {
  name: "AddToFavorite",
  props: {
    productId: Number,
    QuantityPrp: Number
  },
  methods: {
    async addToFavoriteHandler() {
      console.log(this.productId + ' added to Favorite');
      //this.$emit("add-to-cart"); // Emit an event to notify the parent component
      await axios.post(`${apiUrl}/carts`,
        {
          "UserID": 3,
          "ProductID": this.productId,
          "Quantity": 1,
        },
        {
          headers: {
            'Content-type': 'application/json',
          }
        }).then(response => {
          console.log(response);
          //this.$root.$emit('header-getCart');
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/main.scss";
</style>