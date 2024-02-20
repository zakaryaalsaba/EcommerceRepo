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
                  <th>Order Date</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" :key="item.OrderID">
                  <td>
                    <router-link :to="`/orderItems/${item.OrderID}`">
                      {{ item.OrderID }}
                    </router-link>
                  </td>
                  <td>{{ formatDate(item.OrderDate) }}</td>
                  <td>${{ Number(item.TotalAmount).toFixed(2) }}</td>
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
//import AddToCartCom from "@/components/global/AddToCartCom.vue";
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "CustOrders",
  // components: {
  //   AddToCartCom
  // },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        const response = await axios.get(`${apiUrl}/orders/3/1`);
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    formatDate(Pdate) {
      console.log('test')
      console.log('date = ' + Pdate)
      const date = new Date(Pdate);
      return date.toLocaleDateString();

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
}
p.card-header-title {
    text-transform: uppercase;
    letter-spacing: 4px;
    color: green($color: #000000);
    display: block;
    padding-left: 24px;
    padding-bottom: 24px;
  }
</style>