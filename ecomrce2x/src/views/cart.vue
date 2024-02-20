<template>
  <b-container fluid class="pt-4">
    <b-row class="px-xl-5">
      <b-col md="1"></b-col>
      <b-col md="8">
        <b-card :title="VendorName" header-tag="header" footer-tag="footer">
          <div>
            <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged">
              Max Quantity is 99 -
              This alert will dismiss after {{ dismissCountDown }} seconds...
            </b-alert>
          </div>
          <div v-if="MyCart.length > 0">
            <b-table-simple hover small responsive>
              <b-thead class="table-success">
                <b-tr>
                  <b-th class="py-3" colspan="3"
                    style="text-align: center; background-color: #40aa54;color: white;">Product</b-th>
                  <b-th class="py-3" colspan="3" style="background-color: #40aa54;color: white">Price</b-th>
                  <b-th class="py-3" colspan="3"
                    style="text-align: center;background-color: #40aa54;color: white">Quantity</b-th>
                  <b-th class="py-3" colspan="3" style="background-color: #40aa54;color: white">Action</b-th>
                  <b-th class="py-3" colspan="3" style="background-color: #40aa54;color: white">Total</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="cartItem in MyCart" :key="cartItem.CartID" class="bg-white" style="vertical-align: middle">
                  <b-td colspan="3">
                    <!-- You may need to fetch product details based on cartItem.ProductID -->
                     <img src="https://placeholder.com/80x60" alt="" width="80px" height="60px" /> 
                    <!-- <img class="card-img-top"
                      :src="`../../images/products/1/1_${cartItem.ProductID}_${cartItem.ImageName}.jpg`" width="10px"
                      height="60px" alt="Card image cap"> -->
                    {{ cartItem.ProductName }}
                  </b-td>
                  <b-td colspan="3">${{ Number(cartItem.Price).toFixed(2) }}</b-td>
                  <b-td colspan="3">
                    <b-input-group size="sm" class="d-flex justify-content-center">
                      <!-- <b-dropdown id="dropdown-1" v-model="cartItem.Quantity" class="m-md-2" dropup>
                      <template #button-content>
                        {{ cartItem.Quantity }}
                      </template>
                      <b-dropdown-item v-for="quantity in [1, 2, 3, 4, 5, 6, 7, 8, 9,11,12,13,14,15,16,17,18,19,20]" :key="quantity">
                        {{ quantity }}
                      </b-dropdown-item>
                    </b-dropdown> -->
                      <!-- <b-button v-if="cartItem.Quantity == 1" @click="deleteFromCartHandler(cartItem)" variant="none"
                      class="border-0 pe-0">
                      <b-icon icon="trash" variant="secondary"></b-icon>
                    </b-button> -->
                      <b-form-spinbutton id="sb-inline" v-model="cartItem.Quantity" inline style="width: 10px;"
                        @change="updateQuantityHandler(cartItem)"></b-form-spinbutton>
                      <!-- <b-button v-else @click="decreaseQuantityHandler(cartItem)" variant="none" class="border-0 pe-0">
                      <b-icon icon="file-minus" variant="secondary"></b-icon>
                    </b-button>
                    <div style="width: 55px;">
                      <input id="numericInput" readonly class="numeric-input" type="text" v-model="cartItem.Quantity"
                        @input="() => validateNumericInput(cartItem)" />
                    </div>
                    <b-button @click="increaseQuantityHandler(cartItem)" variant="none" class="border-0 pe-0"
                      style="padding-left: 0;">
                      <b-icon icon="file-plus" variant="secondary"></b-icon>
                    </b-button> -->
                    </b-input-group>
                  </b-td>
                  <b-td colspan="3" class="justify-content-center"><b-button v-if="cartItem.Quantity >= 1"
                      @click="ConfirmToDelete(cartItem.CartID)" variant="none" class="border-0 pe-0">
                      <b-icon icon="trash" variant="secondary"></b-icon>
                    </b-button> </b-td>
                  <b-td colspan="3">${{ Number((cartItem.Quantity * cartItem.Price)).toFixed(2) }}</b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot>
                <b-tr>
                  <b-td colspan="11" style="background-color: #40aa54;color: white ;font-weight: bold;"></b-td>
                  <b-td style="background-color: #40aa54;color: white ;font-weight: bold;">Total:</b-td>
                  <b-td style="background-color: #40aa54;color: white ;font-weight: bold;">${{ Number(total).toFixed(2)
                  }}</b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </div>
          <div v-else>
            <b-alert show variant="info">Your shopping basket is empty.</b-alert>
          </div>
        </b-card>

      </b-col>
      <b-col md="3">
        <OrderSummaryCom :subtotal="50.00" :shippingEstimate="10.00" :taxEstimate="5.00" :total="total"
          :showCheckOut="MyCart.length > 0" :showContinueShopping="MyCart.length > 0" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from 'axios';
import store from '../store';

const apiUrl = process.env.VUE_APP_API_URL;
import OrderSummaryCom from "@/components/global/OrderSummaryCom.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "cart",
  components: {
    OrderSummaryCom
  },
  // props: {
  //   VendorID: Number
  // },
  data() {
    return {
      VendorName: '',
      MyCart: [],
      totalProd: 0,
      dismissSecs: 10,
      dismissCountDown: 0,
      boxOne: '',
      boxTwo: '',
      value: 50

    };
  },
  created() {
    this.getCart(this.$route.params.id); //send the venodorId so that we use it with the user to get the cart
    this.getVenders(this.$route.params.id);
  },
  methods: {
    updateQuantityHandler(cartItem) {
      const newQuantity = Number(cartItem.Quantity)
      axios.patch(`${apiUrl}/carts/${cartItem.CartID}`, {
        Quantity: newQuantity
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Quantity increased:', response.data);
        })
        .catch(error => {
          console.error('Error increasing quantity:', error);
        });

      cartItem.Quantity = Number(newQuantity); //.toString();
    },
    increaseQuantityHandler(cartItem) {
      // Increase quantity by 1, limit to 99
      if (parseInt(cartItem.Quantity, 10) + 1 > 10) {
        this.showAlert()
      }
      const newQuantity = Math.min(parseInt(cartItem.Quantity, 10) + 1, 99);

      axios.patch(`${apiUrl}/carts/${cartItem.CartID}`, {
        Quantity: newQuantity
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          // Handle successful quantity increase
          console.log('Quantity increased:', response.data);
          // Now, you may want to update your local cart state or perform any other actions.
        })
        .catch(error => {
          // Handle error
          console.error('Error increasing quantity:', error);
        });

      cartItem.Quantity = newQuantity.toString();
    },
    decreaseQuantityHandler(cartItem) {
      // Decrease quantity by 1, limit to 0
      var newQuantity = Math.max(parseInt(cartItem.Quantity, 10) - 1, 0).toString();

      axios.patch(`${apiUrl}/carts/${cartItem.CartID}`, {
        Quantity: newQuantity
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          // Handle successful quantity increase
          console.log('Quantity increased:', response.data);
          // Now, you may want to update your local cart state or perform any other actions.
        })
        .catch(error => {
          // Handle error
          console.error('Error increasing quantity:', error);
        });

      cartItem.Quantity = newQuantity.toString();
    },
    ConfirmToDelete(cartItemId) {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('Are you sure that you want to delete this item?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxTwo = value
          if (value) {
            this.deleteFromCartHandler(cartItemId);
          }
        })
        .catch(err => {
          console.log(err)
          // An error occurred
        })
    },
    deleteFromCartHandler(cartItemId) {
      axios.delete(`${apiUrl}/carts/${cartItemId}`)
        .then(response => {
          // Handle successful deletion
          console.log('Item deleted from the cart:', response.data);
          this.getCart(this.$route.params.id);
          this.$root.$emit('header-getCart');
          // Now, you may want to update your local cart state or perform any other actions.
        })
        .catch(error => {
          // Handle error
          console.error('Error deleting item from the cart:', error);
        });
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
    async getCart(P_vendorId) {
      try {
        console.log(P_vendorId);
        // Access the state from the store
        const token = store.state.token;
        const loggedInUser = store.state.loggedInUser;

        if (!token || !loggedInUser || !loggedInUser.user || !loggedInUser.user.Id) {
          console.error('Token or user not found. User might not be authenticated.');
          // Handle the case where the user is not authenticated
          return;
        }
        // console.log(token)
        // console.log(loggedInUser)
        // console.log(loggedInUser.user.Id)

        // Assuming you want to fetch cart data for the logged-in user
        const response = await axios.get(`${apiUrl}/carts/${loggedInUser.user.Id}/${P_vendorId}`, {
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
    // async getCategory() {
    //   try {
    //     const loggedInUser = store.state.loggedInUser;
    //     const response = await axios.get(`${apiUrl}/cartsProfile/${loggedInUser.user.Id}`);
    //     this.products = response.data;
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }
    // },
    async getVenders(P_vendorId) {
      try {
        const response = await axios.get(`${apiUrl}/venders/${P_vendorId}`);
        this.vendor = response.data;
        console.log(this.vendor.VendorName);
        this.VendorName = this.vendor.VendorName;
        // this.Vender = this.venders.map(vendor => ({
        //   VendorID: vendor.VendorID,
        //   VendorName: vendor.VendorName,
        // }));
      } catch (error) {
        console.error('Error fetching venders:', error);
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

.table-success-custom {
  background-color: rgb(64, 170, 84);

}

// .b-form-spinbutton .btn {
//   background-color: rgb(64, 170, 84);
//   color: white;
// }

// .test {
//   overflow: visible;
//   border-top-left-radius: 0px;
//   border-top-right-radius: 10px;
//   border-bottom-right-radius: 10px;
//   border-bottom-left-radius: 0px;
//   padding: 0px;
//   opacity: 1;
//   cursor: pointer;
//   align-self: flex-start;
//   min-width: 35px;
//   max-width: 35px;
//   order: 3;
//   min-height: 37px;
//   max-height: 37px;
//   width: 35px;
//   flex-grow: 1;
//   height: 37px;
//   margin-left: 0px;
//   margin-top: 0px;
//   margin-right: 0px;
//   margin-bottom: 0px;
//   z-index: 16
// }
</style>
  