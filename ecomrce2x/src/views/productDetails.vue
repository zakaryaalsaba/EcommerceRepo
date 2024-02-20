<template>
  <b-container class="bv-example-row my-4 mx-auto">
    <b-row>
      <b-col md="1"></b-col>
      <b-col>
        <!-- <b>
          <h2 class="h2Class">{{ product.ProductName }}</h2>
        </b> -->
      </b-col>
      <b-col md="4"></b-col>
    </b-row>
    <b-row>
      &nbsp;
    </b-row>
    <b-row>
      <b-col md="1"></b-col>
      <b-col md="9">
        <b-row>
          <b-col md="6">
            <img class="card-img-top" :src="`../../images/products/1/1_${product.ProductID}_${product.ImageName}.jpg`"
              width="250px" height="450px" alt="Card image cap">
          </b-col>
          <b-col md="6">
            <b>
              <h2 class="h2Class">{{ product.ProductName }}</h2>
            </b>
            <br />
            <p>Store: {{ product.VendorName }}</p>
            <p>Category: {{ product.CategoryName }}</p>
            <p>{{ product.Description }}</p>
            <p>Price: ${{ product.Price }}</p>
            <p>Stock Quantity: {{ product.StockQuantity }}</p>
            <br />
            <AddToCartCom :productId=product.ProductID style="padding: 0.75rem;" />
            <br /><br /><router-link to="/VendorProds/1">Back to All Products</router-link>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import AddToCartCom from "@/components/global/AddToCartCom.vue";
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "ProductDetails",
  components: {
    AddToCartCom
  },
  data() {
    return {
      product: {
        ProductID: 1,
        ProductName: "",
        Description: "",
        Price: 0,
        VendorID: 1,
        CategoryID: 1,
        StockQuantity: 0,
        RegistrationDate: "",
      },
    };
  },
  created() {
    const productId = this.$route.params.id; // Get the ProductID from the route parameter
    this.getProduct(productId);
  },
  methods: {
    AddToCart() {
      console.log('added to cart');
    },
    BackTOProducts() {
      this.$router.push({ name: this.$router.go(-1) });
    },
    async getProduct(id) {
      try {
        const response = await axios.get(`${apiUrl}/products/id/${id}`);
        this.product = response.data; // Update the product data
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
  },
};
</script>

<style scoped>
.h2Class {
  margin: 0;
  line-height: 24px;
  font-weight: unset;
  font-variation-settings: "wght" 800, "opsz" 8;
  --ids-typography-name: headlineMedium1;
  color: #04AA6D;
}
</style>