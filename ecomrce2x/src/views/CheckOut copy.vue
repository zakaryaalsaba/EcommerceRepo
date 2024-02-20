<template>
  <!-- <b-container class="containerPadding px-5NoPadding">
    <div class="text-center">
      <h2>Checkout form</h2>
      <p class="lead">Please fill up the form..</p>
    </div>


    




    <div class="row g-5">
      <div class="col-md-5 col-lg-7 order-md-last">
        <h4 class="d-flex mb-3" style="padding-left: 45px;">
          <span class="text-primary">Your cart</span>
          <span class="rounded-circle bg-primary  ms-1 border text-light" style="padding: 2px 5px 2px 3px">
            {{ MyCart.length }}
          </span>
        </h4>
        <b-row class="px-xl-5" style="width: 1000px;">
          <b-col md="8">
            <div v-if="MyCart.length > 0">
              <b-table-simple hover small>
                <b-thead class="table-success">
                  <b-tr>
                    <b-th class="py-3" style="text-align: center;">Name</b-th>
                    <b-th class="py-3">Price</b-th>
                    <b-th class="py-3">Quantity</b-th>
                    <b-th class="py-3">Total</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="cartItem in MyCart" :key="cartItem.CartID" class="bg-white">
                    <b-td>
                      {{ cartItem.ProductName }}
                    </b-td>
                    <b-td>{{ Number(cartItem.Price).toFixed(2) }} JOD</b-td>
                    <b-td>
                      {{ Number(cartItem.Quantity) }}
                    </b-td>
                    <b-td> {{ Number((cartItem.Quantity * cartItem.Price)).toFixed(2) }} JOD</b-td>
                  </b-tr>
                </b-tbody>
                <b-tfoot>
                  <b-tr>
                    <b-td colspan="2" style="background-color:#a3cfbb;"></b-td>
                    <b-td style="background-color:#a3cfbb;font-weight: bold;">Total:</b-td>
                    <b-td style="background-color:#a3cfbb;;font-weight: bold;">{{ Number(total).toFixed(2) }} JOD</b-td>
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
            </div>
            <div v-else>
              <p>Your shopping basket is empty.</p>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="col-md-7 col-lg-5">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div class="col-12">
              <label for="username" class="form-label">Username</label>
              <div class="input-group has-validation">
                <span class="input-group-text">@</span>
                <input type="text" class="form-control" id="username" placeholder="Username" required>
                <div class="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-12">
              <label for="address2" class="form-label">Address 2 <span
                  class="text-body-secondary">(Optional)</span></label>
              <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
            </div>

            <div class="col-md-5">
              <label for="country" class="form-label">Country</label>
              <select class="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div class="col-md-4">
              <label for="state" class="form-label">State</label>
              <select class="form-select" id="state" required>
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Zip</label>
              <input type="text" class="form-control" id="zip" placeholder="" required>
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>

          <hr class="my-4">

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address">
            <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info">
            <label class="form-check-label" for="save-info">Save this information for next time</label>
          </div>

          <hr class="my-4">

          <h4 class="mb-3">Payment</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required>
              <label class="form-check-label" for="credit">Credit card</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required>
              <label class="form-check-label" for="debit">Debit card</label>
            </div>
            <div class="form-check">
              <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required>
              <label class="form-check-label" for="paypal">PayPal</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required>
              <small class="text-body-secondary">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required>
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>

          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" type="submit">Checkout</button>
        </form>
      </div>
    </div> -->
  <b-container style="max-width: 100%">
    <div class="row">
      &nbsp;
    </div>
    <div class="row">
      <div class="col-75">
        <div class="container">
          <form action="/action_page.php">

            <div class="row">
              <div class="col-50">
                <h3>Billing Address</h3>
                <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                <input type="text" id="fname" name="firstname" placeholder="John M. Doe">
                <label for="email"><i class="fa fa-envelope"></i> Email</label>
                <input type="text" id="email" name="email" placeholder="john@example.com">
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

              <div class="col-50">
                <h3>Payment</h3>
                <label for="fname">Accepted Cards</label>
                <div class="icon-container">
                  <b-icon icon="credit-card" aria-hidden="true" style="color:navy;"></b-icon> Credit Card
                  <!-- <i class="credit-card" style="color:navy;"></i>
              <i class="fa fa-cc-amex" style="color:blue;"></i>
              <i class="fa fa-cc-mastercard" style="color:red;"></i>
              <i class="fa fa-cc-discover" style="color:orange;"></i> -->
                </div>
                <label for="cname">Name on Card</label>
                <input type="text" id="cname" name="cardname" placeholder="John More Doe">
                <label for="ccnum">Credit card number</label>
                <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">
                <label for="expmonth">Exp Month</label>
                <input type="text" id="expmonth" name="expmonth" placeholder="September">

                <div class="row">
                  <div class="col-50">
                    <label for="expyear">Exp Year</label>
                    <input type="text" id="expyear" name="expyear" placeholder="2018">
                  </div>
                  <div class="col-50">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="352">
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




            <!-- <label>
              <input type="checkbox" checked="checked" name="sameadr"> Shipping address same as billing
            </label> -->
            <input type="submit" value="Place Order" class="btn">
          </form>
        </div>
      </div>

      <div class="col-25">
        <div class="container">
          <!-- <h4>Cart
            <span class="price" style="color:black">
              <i class="fa fa-shopping-cart"></i>
              <b>4</b>
            </span>
          </h4>
          <p><a href="#">Product 1</a> <span class="price">$15</span></p>
          <p><a href="#">Product 2</a> <span class="price">$5</span></p>
          <p><a href="#">Product 3</a> <span class="price">$8</span></p>
          <p><a href="#">Product 4</a> <span class="price">$2</span></p>
          <hr>
          <p>Total <span class="price" style="color:black"><b>$30</b></span></p> -->
          <!-- <b-table-simple hover small>
            <b-thead class="table-success">
                  <b-tr>
                    <b-th style="text-align: center;">Name</b-th>
                    <b-th >Price</b-th>
                    <b-th >Quantity</b-th>
                    <b-th>Total</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="cartItem in MyCart" :key="cartItem.CartID" class="bg-white">
                    <b-td>
                      {{ cartItem.ProductName }}
                    </b-td>
                    <b-td>{{ Number(cartItem.Price).toFixed(2) }} JOD</b-td>
                    <b-td>
                      {{ Number(cartItem.Quantity) }}
                    </b-td>
                    <b-td> {{ Number((cartItem.Quantity * cartItem.Price)).toFixed(2) }} JOD</b-td>
                  </b-tr>
                </b-tbody>
                <b-tfoot>
                  <b-tr>
                    <b-td colspan="2" style="background-color:#a3cfbb;"></b-td>
                    <b-td style="background-color:#a3cfbb;font-weight: bold;">Total:</b-td>
                    <b-td style="background-color:#a3cfbb;;font-weight: bold;">{{ Number(total).toFixed(2) }} JOD</b-td>
                  </b-tr>
                </b-tfoot>
          </b-table-simple> -->
          <div>
            <b-card title="Order Summary" class="mb-4">
              <b-row>&nbsp;</b-row>
              <b-row>
                <b-col md="8">
                  Subtotal
                </b-col>
                <b-col md="4" style="white-space: nowrap;">
                  ${{ total }}
                </b-col>
              </b-row>
              <hr>
              <b-row>
                <b-col md="8">
                  Shipping estimate
                  <b-icon icon="info-circle" scale="1"></b-icon>
                </b-col>
                <b-col md="4" style="white-space: nowrap;">
                  ${{ total }}
                </b-col>
              </b-row>
              <hr>
              <b-row>
                <b-col md="8">
                  Tax estimate
                  <b-icon icon="info-circle" scale="1"></b-icon>
                </b-col>
                <b-col md="4" style="white-space: nowrap;">
                  ${{ total }}
                </b-col>
              </b-row>
              <hr>
              <b-row>
                <b-col md="8">
                  <b>Order Total</b>
                </b-col>
                <b-col md="4" style="white-space: nowrap;">
                  <b style="color: #fa6338;">${{ total }}</b>
                </b-col>
              </b-row>
            </b-card>
          </div>

        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CheckOut",
  //   props: {
  //     cartItems: JSON.parse(route.params.cartItems),
  //   },
  data() {
    return {
      MyCart: [],
      totalProd: 0,
    };
  },
  created() {
    this.getCart();
    // console.log(this.MyCart);
  },
  methods: {
    removeProduct(index) {
      this.MyCart.splice(index, 1);
    },
    async getCart() {
      try {
        const response = await axios.get(`${apiUrl}/carts/3`); // Assuming you want to fetch cart data for user ID 3
        this.MyCart = response.data;
      } catch (error) {
        console.error('Error fetching Cart:', error);
      }
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

<style lang="scss" scoped>
@import "@/assets/main.scss";

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

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #04AA6D;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
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

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
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