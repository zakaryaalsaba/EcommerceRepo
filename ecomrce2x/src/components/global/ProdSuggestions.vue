<template>
  <!-- <div class="autocomplete">
      <div class="input-container">
        <span v-show="showSearchIcon" class="search-icon">&#128269;</span>
        <input v-model="searchQuery" @input="fetchSuggestions" placeholder="Search for Products" class="rounded-0 shadow-none form-control">
        <span v-show="!showSearchIcon" class="clear-icon" @click="clearSearch">&#10006;</span>
      </div>
      <ul v-if="showSuggestions" class="suggestions">
        <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">{{ suggestion.ProductName }}</li>
      </ul>
    </div> -->
  <div class="autocomplete">
    <div>
      <b-input-group size="sm" class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="search" placeholder="Search for Products" v-model="searchQuery"
          @input="fetchSuggestions"></b-form-input>
      </b-input-group>
    </div>
    <ul v-if="showSuggestions" class="suggestions">
      <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">{{
        suggestion.ProductName }}</li>
    </ul>

  </div>
</template>
  
<script>
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: 'ProdSuggestions',
  data() {
    return {
      searchQuery: '',
      suggestions: [],
      showSuggestions: false,
      showSearchIcon: true,
    };
  },
  //   watch: {
  //   '$route': {
  //     immediate: true,
  //     handler(newRoute) {
  //       // Fetch the new product details when the route changes
  //       this.fetchSuggestions(newRoute.params.id);
  //     }
  //   }
  // },
  methods: {
    fetchSuggestions() {
      if (this.searchQuery.length > 2) {
        this.showSearchIcon = false;
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
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.ProductName;
      this.suggestions = [];
      this.showSuggestions = false;
      if (this.$route.params.id !== suggestion.ProductID.toString()) {
        this.$router.push(`/ProdsByName/${suggestion.ProductID}`);
      } // Update 'id' with your item's ID 
    },
    clearSearch() {
      this.searchQuery = '';
      this.showSearchIcon = true;
    },
  },
};
</script>
  
<style>
.autocomplete {
  position: sticky;
  z-index: 1000;
  /* Set a higher z-index to ensure it appears on top of other controls */
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  right: 10px;
  color: #777;
  cursor: pointer;
}

.clear-icon {
  position: absolute;
  right: 10px;
  color: #777;
  cursor: pointer;
}

input {
  padding: 8px 30px 8px 30px;
  width: 500px;
  border: 1px solid #ccc;
  /* border-radius: 4px; */
  /* flex: 1 1 auto; */
}

ul.suggestions {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  width: 198px;
  z-index: 1000;
  /* Match the z-index with the parent */
}

ul.suggestions li {
  padding: 8px;
  background-color: #fff;
  cursor: pointer;
}

ul.suggestions li:hover {
  background-color: #f0f0f0;
}
</style>