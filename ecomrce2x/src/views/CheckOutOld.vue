<template>
  <b-container class="containerPadding px-5NoPadding">
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
                    <b-td>${{ Number(cartItem.Price).toFixed(2) }}</b-td>
                    <b-td>
                      {{ Number(cartItem.Quantity) }}
                    </b-td>
                    <b-td>${{ Number((cartItem.Quantity * cartItem.Price)).toFixed(2) }}</b-td>
                  </b-tr>
                </b-tbody>
                <b-tfoot>
                  <b-tr>
                    <b-td colspan="2" style="background-color:#a3cfbb;"></b-td>
                    <b-td style="background-color:#a3cfbb;font-weight: bold;">Total:</b-td>
                    <b-td style="background-color:#a3cfbb;;font-weight: bold;">${{ Number(total).toFixed(2) }}</b-td>
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

.px-5NoPadding {
  padding-left: 3rem !important;
}

.containerPadding {
  padding-bottom: 3rem !important;
}

.container {
  // max-width: 960px;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
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
</style>