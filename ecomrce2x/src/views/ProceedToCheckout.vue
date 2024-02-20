<template>
  <b-container fluid class="pt-4">
    <b-row class="px-xl-5">
      <b-col md="9">
        <div v-if="MyCart.length > 0">
          <div class="container">
            <div class="row">
              <div class="col-50">
                <h3>Billing Address</h3>
                <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                <input type="text" id="fname" name="firstname" placeholder="John M. Doe">
                <label for="email"><i class="fa fa-envelope"></i> Email</label>
                <input type="text" v-model="customerEmail" id="email" name="email" placeholder="john@example.com">
                <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
                <input type="text" id="adr" name="address" placeholder="542 W. 15th Street">
                <label for="city"><i class="fa fa-institution"></i> City</label>
                <input type="text" id="city" name="city" placeholder="New York">
                <div class="row">
                  <div class="col-50">
                    <label for="state">State</label>
                    <input type="text" id="state" name="state" placeholder="NY">
                  </div>
                  <div class="col-50">
                    <label for="zip">Zip</label>
                    <input type="text" id="zip" name="zip" placeholder="10001">
                  </div>
                </div>
              </div>
            </div>
            <table>
              <tr>
                <td>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </td>
                <td>
                  <div style="padding: 2px;">Shipping address same as billing</div>
                </td>
              </tr>
            </table>
            <b-col md="12" class="mb-2">
              <b-button variant="success" class="custom-btn btnPlaceOrder" @click="proceedToCheckOutHandler()">Proceed To
                Checkout</b-button>
              <router-link :to="`/CheckOut`">Go to Checkout
              </router-link>
            </b-col>
          </div>
        </div>
        <div v-else>
          <b-alert show variant="info">Your shopping basket is empty.</b-alert>
        </div>
      </b-col>
      <b-col md="3">
        <OrderSummaryCom :subtotal="50.00" :shippingEstimate="10.00" :taxEstimate="5.00" :total="total"
          :showCheckOut="false" :showContinueShopping="false" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from 'axios';
import store from '../store'
const apiUrl = process.env.VUE_APP_API_URL;
import OrderSummaryCom from "@/components/global/OrderSummaryCom.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ProceedToCheckout",
  components: {
    OrderSummaryCom
  },
  data() {
    return {
      MyCart: [],
      totalProd: 0,
      dismissSecs: 10,
      dismissCountDown: 0,
      boxOne: '',
      boxTwo: '',
      value: 50,
      customerEmail: '',

    };
  },
  created() {
    this.getCart();
    // console.log(this.MyCart);
  },
  methods: {
    async proceedToCheckOutHandlerTest() {
      try {
        //const response = 
        await axios.post(`${apiUrl}/stripeRoutes/createcustomer`, {
          email: this.customerEmail,// 'customer@example.com',
        }).then(response => {
          console.log('Customer ID:', response.data.customerId);

          //navigate to this URL:
          //https://buy.stripe.com/test_cN21543iv1gGak0fYY
          window.location.href = `https://buy.stripe.com/test_cN21543iv1gGak0fYY`;
        })
          .catch(error => {
            console.error('Error');
            console.error(error);

          });
      } catch (error) {
        console.error('Error creating customer:');

        //console.error('Error creating customer:', error.response.data.error);
      }
    },
    validateNumericInput(cartItem) {
      // Remove non-numeric characters
      cartItem.Quantity = cartItem.Quantity.replace(/\D/g, '');

      // Ensure the value is between 0 and 99
      let numericValue = parseInt(cartItem.Quantity, 10) || 0;
      cartItem.Quantity = Math.min(Math.max(numericValue, 0), 99).toString();
      if (numericValue > 99) {
        this.showAlert()
      }
    },
    async getCart() {
      try {
        // Access the state from the store
        const token = store.state.token;
        const loggedInUser = store.state.loggedInUser;

        if (!token || !loggedInUser || !loggedInUser.user || !loggedInUser.user.Id) {
          console.error('Token or user not found. User might not be authenticated.');
          // Handle the case where the user is not authenticated
          return;
        }

        console.log(token)
        console.log(loggedInUser)
        console.log(loggedInUser.user.Id)

        // Assuming you want to fetch cart data for the logged-in user
        const response = await axios.get(`${apiUrl}/carts/${loggedInUser.user.Id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
          }
        });

        this.MyCart = response.data;
      } catch (error) {
        console.error('Error fetching Cart:', error);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
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
  
<style lang="scss">
@import "@/assets/main.scss";

.qty-num {
  width: 34px;
  height: 28px;
  line-height: 28px;
  outline: none;
  color: #000;
  font-size: 13px;
}

.custom-btn {
  font-size: 14px;
  /* Adjust the font size as needed */
  white-space: nowrap;
  /* Prevent button text from wrapping */
}

.numeric-input {
  width: 100%;
  /* Make sure the input takes the full width */
  height: 20px;
  line-height: 28px;
  outline: none;
  color: #000;
  font-size: 13px;
  padding-left: 5px;
}

.see {
  background: $color-global;
}

input {
  padding: 0;
}

.c-bag-qty {
  white-space: nowrap;
  display: -webkit-box;
  display: flex;
  display: -ms-flexbox;
  height: 30px;
  -webkit-box-align: center;
  align-items: center !important;
  overflow: hidden;
}

.row {
  //padding: 25px;
  display: -ms-flexbox;
  /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap;
  /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%;
  /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%;
  /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%;
  /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

// .icon-container {
//   margin-bottom: 20px;
//   padding: 7px 0;
//   font-size: 24px;
// }

.btnPlaceOrder {
  background-color: #198754;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btnPlaceOrder:hover {
  background-color: #146c43;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }

  .col-25 {
    margin-bottom: 20px;
  }
}

.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
  