<template>
  <div>
    <b-row>
      <b-col md="1"></b-col>
      <b-col md="10">
        <b-card :title="`You have ${products.length} Cart(s)`" header-tag="header">
          <!-- footer="The amount per basket is for items only. Final total amount will show at checkout." footer-tag="footer" -->
          <b-row>
            <b-col md="12">
              <div v-for="product in products" :key="product.VendorID" style="padding: 10px;">
                <b-card img-lazy :aria-expanded="isVisible(product.VendorID) ? 'true' : 'false'"
                  :aria-controls="`collapse${product.VendorID}`" @click="toggleDiv(product.VendorID)" pill
                  variant="light">
                  <b-icon :icon="isVisible(product.VendorID) ? 'chevron-up' : 'chevron-down'"></b-icon>
                  In <span style="color:#157347"><b>{{ product.VendorName }}</b></span>, you have <b>{{ product.NumberOfItems }}</b> item(s) for a total price of
                  <span style="color:#fa6338"><b>${{(product.TotalPrice).toFixed(2) }}</b></span>

                  <b-collapse :id="`collapse${product.VendorID}`" v-model="visible[product.VendorID]" class="mt-2">
                    <MyCartCom :vendorId="`${product.VendorID}`" />
                  </b-collapse>
                  <template #footer>
                    <b-row>
                      <b-col md="3" class="mb-2">
                        <b-button :to="`/cart/${product.VendorID}`" variant="success" class="custom-btn">View
                          Cart</b-button>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <b-button to="/CheckOut" variant="success" class="custom-btn">Proceed To
                          Checkout</b-button>
                      </b-col>
                      <b-col md="3">
                        <b-button to="/AllVenders" variant="success" class="custom-btn">Continue
                          Shopping</b-button>
                      </b-col>
                    </b-row>
                  </template>
                </b-card>
              </div>
            </b-col>
          </b-row>
          <template #footer>
            <b-row>
              <b-col md="9">
                <b-button to="/CheckOut" variant="success" class="custom-btn" block>Proceed To Checkout All</b-button>
              </b-col>
            </b-row>
          </template>
        </b-card>
      </b-col>
      <b-col md="1"></b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../../store'
import MyCartCom from "@/components/global/MyCartCom.vue";
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "MyBasketsCom",
  components: {
    MyCartCom
  },
  data() {
    return {
      visible: {},
      products: []
    };
  },
  created() {
    this.$root.$on('MyCartCom-getAllcarts', () => { this.getAllcarts() })
    this.getAllcarts(); //visible = !visible
  },
  methods: {
    toggleDiv(id) {
      this.$set(this.visible, id, !this.visible[id]);
    },
    isVisible(id) {
      return this.visible[id] || false;
    },
    getVendorName(fullName) {
      return fullName.trim().split(' ')[0];
    },
    async getAllcarts() {
      try {
        const loggedInUser = store.state.loggedInUser;
        const response = await axios.get(`${apiUrl}/cartsProfile/${loggedInUser.user.Id}`);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  background-color: #f2f2f2;
}

.see {
  /* Add any additional button styles here */
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  background-color: #f2f2f2;
}

.see {
  /* Add any additional button styles here */
}

#vendors {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#vendors td,
#vendors th {
  border: 1px solid #ddd;
  padding: 8px;
}

#vendors tr:nth-child(even) {
  background-color: #f2f2f2;
}

#vendors tr:hover {
  background-color: #ddd;
}

#vendors th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  /* Center the header text */
  background-color: #40aa54;
  color: white;
}
</style>
