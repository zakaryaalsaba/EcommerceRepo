<template>
  <b-container class="py-5">
    <b-row>
      <header class="card-header">
        <!-- <p class="card-header-title" v-if="ptoRequests"> -->
        <p class="card-header-title">
          <!-- {{ ptoRequests[0].EmployeeName }}  -->
          My Orders:
        </p>
      </header>
      <div class="card-content">
        <div class="content" style="padding-left: 100px;">
          <table class="table" style="width: 100%">
            <thead class="table-success">
              <tr>
                <th>Order Number</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orderItems" :key="item.OrderItemID">
                <td>{{ item.OrderID }}</td>
                <td>{{ item.ProductName }}</td>
                <td>{{ item.Quantity }}</td>
                <td>${{ (item.Price).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "orderItems",
  // components: {
  //   AddToCartCom
  // },
  data() {
    return {
      orderItems: [],
    };
  },
  created() {
    this.getOrderItems();
  },
  methods: {
    async getOrderItems() {
      try {
        const response = await axios.get(`${apiUrl}/orderItems/1`);
        this.orderItems = response.data;
      } catch (error) {
        console.error('Error fetching orderItems:', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.add-prod {
  background: $color-global;

  &:hover {
    background: $color-global;
  }
}

.rowNew {
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}</style>