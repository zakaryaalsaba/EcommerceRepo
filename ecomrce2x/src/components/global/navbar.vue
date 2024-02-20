<template>
  <b-container fluid lg="px-0" class="bg-white">
    <!-- <b-row class="top-bar py-1 px-xl-5 position-relative"> -->
    <!-- <b-col class="lg-6 d-none d-lg-block text-start">
        <div class="d-inline-flex align-items-center h-100">
          <a class="text-decoration-none me-3" href="">About</a>
          <a class="text-decoration-none me-3" href="">Contact</a>
          <a class="text-decoration-none me-3" href="">Help</a>
          <a class="text-decoration-none me-3" href="">FAQs</a>
        </div>
      </b-col> -->
    <!-- <b-col class="lg-6 text-center text-lg-end"> -->
    <!-- <b-dropdown id="dropdown-1" text="My Account" class="me-2 text-dark" variant="none" right
          toggle-class="shadow-none rounded-0 py-1 px-2 border-light">
          <b-dropdown-item to="/login" v-if="user == null">Sign In</b-dropdown-item>
          <b-dropdown-item to="/register" v-if="user == null">Sign Up</b-dropdown-item>
          <b-dropdown-item class="w-100 mx-1" v-if="user" @click="logout()">Sign Out</b-dropdown-item>
        </b-dropdown> -->
    <!-- <b-dropdown id="dropdown-1" text="EN" variant="none" class="text-darkt" right
          toggle-class="shadow-none rounded-0 py-1 px-2 border-light">
          <b-dropdown-item>FR</b-dropdown-item>
          <b-dropdown-item>AR</b-dropdown-item>
        </b-dropdown> -->
    <!-- <div class="d-lg-none d-inline">
          <b-button size="lg" variant="none" class="border-0 pe-0">
            <b-icon
              icon="cart-fill"
              variant="secondary"
              class="icon-cart"
            ></b-icon>
          </b-button>
          <span class="text-secondary fw-bold"> 0,000 DT test</span>
        </div> -->
    <!-- </b-col>
    </b-row> -->
    <b-row class="navsm py-2 px-xl-5 px-3">
      <b-navbar toggleable="lg">
        <b-col lg="3" sm="6" class="text-start ms-lg-2">
          <b-navbar-brand tag="h2" class="p-0 fw-bold">
            <b-link to="/" class="text-decoration-none fw-bold text-uppercase py-2">
              <span class="text-success">E-</span>shop
            </b-link>
          </b-navbar-brand>
        </b-col>
        <b-navbar-toggle target="nav-collapse" class="bg-white shadow-none text-end"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav class="justify-content-between">
          <b-col lg="9">
            <ProdSuggestions />
          </b-col>
          <b-col lg="1">
            <div>
              <b-navbar toggleable="lg" type="dark">
                <b-collapse id="nav-collapse" is-nav>
                  <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                      <template #button-content>
                        <b-button pill variant="outline-success" @click="toggleDropdown">
                          <b-icon icon="person-fill"></b-icon>
                        </b-button>
                      </template>
                      <b-dropdown-item href="#">Profile</b-dropdown-item>
                      <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                  </b-navbar-nav>
                </b-collapse>
              </b-navbar>
            </div>
          </b-col>
        </b-collapse>
      </b-navbar></b-row>
  </b-container>
</template>

<script>
import ProdSuggestions from './ProdSuggestions.vue'
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "navbar",
  components: {
    ProdSuggestions,
  },
  data() {
    return {
      user: null,
      searchProduct: "",
      filteredProducts: [],
      Products: [],
      showDropdown: false
    };
  },
  created() {

  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    fetchSuggestions() {
      console.log('test')
      if (this.searchQuery.length > 2) {
        // Make an API request to fetch suggestions based on the input
        fetch(`${apiUrl}/products/${this.searchQuery}`)
          .then((response) => response.json())
          .then((data) => {
            this.suggestions = data; // Update suggestions with fetched data
            this.showSuggestions = true; // Show the suggestions
          })
          .catch((error) => {
            console.error('Error fetching suggestions', error);
          });
      } else {
        this.suggestions = []; // Clear suggestions if search query length is less than 3
        this.showSuggestions = false; // Hide suggestions
      }
    },
    // logout() {
    //   const auth = getAuth();
    //   signOut(auth)
    //     .then(() => {
    //       localStorage.removeItem("User");
    //       router.push({
    //         name: "login",
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // async getProducts() {
    //   const sousCollectionRef = query(collectionGroup(db, `products`));
    //   const sousCollectionSnapshot = await getDocs(sousCollectionRef);
    //   this.Products = [];
    //   sousCollectionSnapshot.forEach((doc) => {
    //     this.Products.push({
    //       id: doc.id,
    //       name: doc.data().name,
    //       description: doc.data().description,
    //       price: doc.data().price,
    //       image: doc.data().image,
    //     });
    //   });
    // },
    // filterItems() {
    //   this.filteredProducts = this.Products.filter((item) => {
    //     return item.name
    //       .toLowerCase()
    //       .includes(this.searchProduct.toLowerCase());
    //   });
    //   this.$root.$emit("filtered-Products", this.filteredProducts);
    // },
    //z-index: 1001;
    //  position: sticky;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/main.scss";

.container-fluid {

  .navsm {
    @media (max-width: 991px) {
      background: $color-global;
    }

    h2 {
      a {
        font-size: 30px;
        letter-spacing: 3px;
        color: $color-global;

        @media (max-width: 991px) {
          color: #f5f5f5;
          //#ffc107;
        }
      }
    }
  }

  .top-bar {
    background: #f5f5f5;

    a {
      color: #6c757d;
    }
  }

  .b-dropdown {
    background: white;
  }

  .cart {
    color: white;
    font-size: 1.7rem;
  }

  .dropdown-toggle::after {
    display: none;
  }

  .user {
    .usericon {
      font-size: 2rem;
    }

    &::after {
      display: none;
    }
  }
}
</style>
