<template>
  <!-- <b-container fluid lg="px-0" class="bg-white"> -->
  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-row>
          <b-col md="3">
            <b-navbar-brand tag="h2" class="p-0 fw-bold">
              <b-link to="/" class="text-decoration-none fw-bold text-uppercase py-2">
                <span class="text-success">E-</span>shop
              </b-link>
            </b-navbar-brand>
          </b-col>
          <b-col md="6">

            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              </b-nav-form>


              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <b-button pill variant="outline-success" @click="toggleDropdown">
                    <b-icon icon="person-fill"></b-icon>
                  </b-button>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

          </b-col>

          <b-col md="6">

          </b-col>

        </b-row>

        <!-- Right aligned nav items -->

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
//import ProdSuggestions from './ProdSuggestions.vue'
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "navbar",
  components: {
    //ProdSuggestions,
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
          color:#f5f5f5
          // #ffc107;
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
