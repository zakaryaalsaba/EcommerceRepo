<template>
  <b-container fluid class="d-lg-block d-none">
    <b-row class="px-xl-5">
      <b-col lg="3">
        <b-dropdown toggle-class="shadow-none btn-success d-flex align-items-center justify-content-between rounded-0"
          split-variant="outline-primary" class="w-100 h-100" menu-class="w-100 rounded-0">
          <template #button-content>
            <b-icon icon="justify" aria-hidden="true"></b-icon>All Stores
            <!-- <b-icon icon="justify" aria-hidden="true"></b-icon>Categories -->
          </template>

          <b-dropdown-item :href="`/venderDetails/${item.VendorID}`" v-for="item in Vender" :key="item.VendorID">
            {{ item.VendorName }}
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col lg="7">
        <b-list-group horizontal class="pt-2 w-100">
          <!-- <b-list-group-item to="/AllProd" class="bg-transparent text-white border-0" active>Home</b-list-group-item> -->
          <!-- <b-list-group-item to="/AllProd" class="bg-transparent text-white border-0">Products</b-list-group-item> -->
          <b-list-group-item to="/AllVenders" class="bg-transparent text-white border-0">Stores</b-list-group-item>
          <b-list-group-item to="/CustOrders" class="bg-transparent text-white border-0">My Order</b-list-group-item>
          <b-list-group-item to="/VendorOrders" class="bg-transparent text-white border-0">Store's
            Order</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col lg="2" class="d-flex justify-content-end align-items-center position-relative">
        <!-- <b-button variant="success">
          <b-icon icon="cart-fill" variant="Light" class="icon-cart"></b-icon>
          Cart
        </b-button> -->
        <b-button size="lg" variant="none" class="border-0" to="/MyBaskets">
          <b-icon icon="cart-fill" variant="Light" class="icon-cart"></b-icon>
          <span class="rounded-circle ms-1 border text-light" style="padding: 2px 5px 2px 0">
            {{ TotalQuantity }}
          </span>
        </b-button>
        <!-- <b-button size="lg" variant="none" class="border-0" @click="showCart = !showCart">
          <b-icon icon="cart-fill" variant="Light" class="icon-cart"></b-icon>
          <span class="rounded-circle ms-1 border text-light" style="padding: 2px 5px 2px 0">
            {{ TotalQuantity }}
          </span>
        </b-button> -->
        <!-- "x-square" -->
        <!-- <b-card no-body class="overflow-hidden" v-if="false">
          <b-icon @click="showCart = false" icon="x" style="cursor:pointer"></b-icon>
          <p class="fw-bold d-flex align-items-center justify-content-center">
            Total: <span class="p-2">${{ total }}</span>
          </p>
          <b-button @click="showCart = false" to="/cart" variant="dark" class="see mb-2">View Cart</b-button>
          <b-button to="/ProceedToCheckout" @click="showCart = false" variant="success">Proceed to checkout</b-button>
        </b-card> -->
        <!-- <b-card title="All baskets" no-body class="mb-20 overflow-hidden" v-if="showCart">
          <MyBasketsCom />
        </b-card> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import store from '../../store'

const apiUrl = process.env.VUE_APP_API_URL;
//import { eventHub } from '@/main'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      MyCart: [],
      showCart: false,
      cartItems: [],
      //total: 0,
      cat: {
        name: "",
      },
      TotalQuantity: 0,
      Vender: [],
      DataCatID: {
        name: "",
        id: "",
      },
    };
  },
  created() {
    this.getVenders();
    this.getCart();
    this.$root.$on('header-getCart', () => { this.getCart() })
    this.$root.$on('header-showAlert', () => { this.showAlertApp() })
    // this.events = [
    //   { name: 'header-getCart', fn: () => { this.getCart() } }
    //   //,{ name: 'xxxx-xxx', fn: (policies) => { this.onSelectedPolicies(policies) } }
    // ]
    // for (const e of this.events) { eventHub.$on(e.name, e.fn) } // add event listeners
    //this.getCart()

  },
  //beforeDestroy () { for (const e of this.events) { eventHub.$off(e.name, e.fn) } }, // cleanup event listeners
  mounted() {
  },
  methods: {
    async getCart() {
      try {
        const loggedInUser = store.state.loggedInUser;

        this.TotalQuantity = 0;
        const response = await axios.get(`${apiUrl}/carts/${loggedInUser.user.Id}`); // Assuming you want to fetch cart data for user ID 3
        this.MyCart = response.data;
        console.log(this.MyCart);
        if (this.MyCart && this.MyCart.length > 0) {
          this.MyCart.forEach(item => {
            this.TotalQuantity = this.TotalQuantity + item.Quantity
          });
        }
      } catch (error) {
        console.error('Error fetching Cart:', error);
      }
    },
    showAlertApp() {
      console.log('header-showAlert');
      this.$root.$emit('App-showAlert');
    },
    async getVenders() {
      try {
        const response = await axios.get(`${apiUrl}/venders`);
        this.venders = response.data;
        console.log(this.venders)
        this.Vender = this.venders.map(vendor => ({
          VendorID: vendor.VendorID,
          VendorName: vendor.VendorName,
        }));
      } catch (error) {
        console.error('Error fetching venders:', error);
      }
    }
  },
  computed: {
    total() {
      let total = 0;
      this.MyCart.forEach((product) => {
        total += product.Price * product.Quantity;
      });
      //return total.toFixed(2);
      return Number(total).toFixed(2);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/main.scss";

.container-fluid {
  background: $color-global;
  z-index: 1001;
  /* position: sticky;*/
}

.see {
  background: $color-global;
}

.icon-cart {
  color: white; // #ffbf00;
}

.card {
  position: absolute;
  top: 46px;
  right: 0;
  width: 350px;
  z-index: 1000;
  padding: 16px 20px;
}

.close-icon {
  cursor: pointer;
}
</style>
