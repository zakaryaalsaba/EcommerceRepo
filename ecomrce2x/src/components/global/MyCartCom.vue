<template>
  <div v-if="MyCart.length > 0">
    <b-table-simple hover small responsive>
      <b-thead class="table-success">
        <b-tr>
          <b-th class="py-3" colspan="3"
            style="text-align: center; background-color: #40aa54;color: white;">Product</b-th>
          <b-th class="py-3" colspan="3" style="background-color: #40aa54;color: white">Price</b-th>
          <b-th class="py-3" colspan="3" style="text-align: center;background-color: #40aa54;color: white">Quantity</b-th>
          <b-th class="py-3" colspan="3" style="background-color: #40aa54;color: white">Action</b-th>
          <b-th class="py-3" colspan="3" style="background-color: #40aa54;color: white">Total</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="cartItem in MyCart" :key="cartItem.CartID" class="bg-white" style="vertical-align: middle">
          <b-td colspan="3">
            <img src="https://placeholder.com/80x60" alt="" width="80px" height="60px" />
            {{ cartItem.ProductName }}
          </b-td>
          <b-td colspan="3">${{ Number(cartItem.Price).toFixed(2) }}</b-td>
          <b-td colspan="3">
            <b-input-group size="sm" class="d-flex justify-content-center">
              <b-form-spinbutton id="sb-inline" v-model="cartItem.Quantity" inline style="width: 10px;"
                @change="updateQuantityHandler(cartItem)"></b-form-spinbutton>
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
</template>
  
<script>
import axios from 'axios';
import store from '../../store';
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "MyCartCom",
  props: {
    //MyCart: [],
    vendorId: Number
  },
  data() {
    return {
      MyCart: []
    };
  },
  created() {
    this.getCart(this.vendorId); //send the venodorId so that we use it with the user to get the cart
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
          this.$root.$emit('MyCartCom-getAllcarts');
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
          this.$root.$emit('MyCartCom-getAllcarts');
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
          this.$root.$emit('MyCartCom-getAllcarts');
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
          
          if (this.vendorId){
            this.getCart(this.vendorId);
            this.$root.$emit('header-getCart');
            this.$root.$emit('MyCartCom-getAllcarts');
          }
          else{
            this.getCart(this.$route.params.id);
            this.$root.$emit('header-getCart');
          }
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
    // async getVenders(P_vendorId) {
    //   try {
    //     const response = await axios.get(`${apiUrl}/venders/${P_vendorId}`);
    //     this.vendor = response.data;
    //     console.log(this.vendor.VendorName);
    //     this.VendorName = this.vendor.VendorName;
    //     // this.Vender = this.venders.map(vendor => ({
    //     //   VendorID: vendor.VendorID,
    //     //   VendorName: vendor.VendorName,
    //     // }));
    //   } catch (error) {
    //     console.error('Error fetching venders:', error);
    //   }
    // },
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
  // methods: {
  //   async getCart(P_vendorId) {
  //     try {
  //       // Access the state from the store
  //       const token = store.state.token;
  //       const loggedInUser = store.state.loggedInUser;

  //       if (!token || !loggedInUser || !loggedInUser.user || !loggedInUser.user.Id) {
  //         console.error('Token or user not found. User might not be authenticated.');
  //         // Handle the case where the user is not authenticated
  //         return;
  //       }
  //       // console.log(token)
  //       // console.log(loggedInUser)
  //       // console.log(loggedInUser.user.Id)

  //       // Assuming you want to fetch cart data for the logged-in user
  //       const response = await axios.get(`${apiUrl}/carts/${loggedInUser.user.Id}/${P_vendorId}`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-type': 'application/json',
  //         }
  //       });

  //       this.MyCart = response.data;
  //       console.log(this.MyCart);
  //     } catch (error) {
  //       console.error('Error fetching Cart:', error);
  //     }
  //   },
  // },
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