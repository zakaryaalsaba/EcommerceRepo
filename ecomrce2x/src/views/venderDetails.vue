<template>
  <b-container class="bv-example-row my-4 mx-auto">
    <b-row>
      <b-col md="1"></b-col>
      <b-col>
        <b>
          <h2 class="h2Class">{{ vender.VendorName }}</h2>
        </b>
      </b-col>
      <b-col md="4"></b-col>
    </b-row>
    <b-row>
      &nbsp;
    </b-row>
    <b-row>
      <b-col md="1"></b-col>
      <b-col md="10">
        <div class="card" style="max-width: 50rem;">
          <img class="card-img-top" :src="`../../vendorsImg/${vender.VendorID}_${getVendorName(vender.VendorName)}.jpg`"
            alt="Card image cap" width="100px" height="350px">
          <div class="card-body">
            <p class="card-text">{{ vender.Description }}</p>
          </div>
          <div class="card-footer">
            <b-button @click="GetAllVenderProducts(vender.VendorID)" variant="outline-success">
              <b-icon icon="eye"></b-icon> View Products
            </b-button>
          </div>
        </div>
        <div class="row">
          <br /><br /><router-link to="/AllVenders">Back to All venders</router-link>
        </div>

      </b-col>
      <b-col md="1"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
// import VendorProds from "../views/VendorProds.vue"
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "venderDetails",
  components: {
    // VendorProds,
  },
  data() {
    return {
      vender: {
        VendorID: 1,
        UserID: 3,
        VendorName: "VENDER NAME",
        Description: "DESC",
        RegistrationDate: "2023-10-26T22:52:38.000Z"
      },
    };
  },
  created() {
    const vendorId = this.$route.params.id; // Get the vendorId from the route parameter
    this.getvender(vendorId);
  },
  methods: {
    AddToCart() {
      console.log('added to cart');
    },
    GetAllVenderProducts(VenderId) {
      this.$router.push(`/VendorProds/${VenderId}`);
    },
    getVendorName(fullName) {
      // Split the full name into words and return the first word
      return fullName.trim().split(' ')[0];
    },
    async getvender(id) {
      try {
        const response = await axios.get(`${apiUrl}/venders/${id}`);
        this.vender = response.data; // Update the vender data
      } catch (error) {
        console.error('Error fetching vender:', error);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/main.scss";

.vender-details {
  /* max-width: 1000px; */
  padding-left: 200px;
  padding-top: 50px;
  margin: 0 auto;
}

.h2Class {
  margin: 0;
  line-height: 24px;
  font-weight: unset;
  font-variation-settings: "wght" 800, "opsz" 8;
  --ids-typography-name: headlineMedium1;
  color: #04AA6D;
}
</style>