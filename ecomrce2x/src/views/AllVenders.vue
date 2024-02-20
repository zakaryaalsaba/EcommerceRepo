<template>
  <b-container class="bv-example-row my-4 mx-auto">
    <VendorTypesButtonsCom titleProp="All Grocery Stores" />
    <b-row>
      <b-col md="1"></b-col>
      <b-col md="10">
        <b-row>
          <div class="rowNew">
            <div class="card" v-for="vender in venders" :key="vender.VendorID" style="max-width: 20rem; margin: 10px;">
              <router-link :to="`/venderDetails/${vender.VendorID}`">
                <img class="card-img-top" width="200px" height="200px"
                  :src="`../../vendorsImg/${vender.VendorID}_${getVendorName(vender.VendorName)}.jpg`"
                  alt="Card image cap">
              </router-link>
              <div class="card-body">
                <router-link :to="`/venderDetails/${vender.VendorID}`">
                  <p class="card-title">{{ vender.VendorName }}</p>
                </router-link>
                <p class="card-text">{{ vender.Description }}</p>
                <p class="card-text"><small class="text-muted">Last updated {{ vender.RegistrationDate }}</small></p>
              </div>
              <div class="card-footer">
                <b-button @click="GetAllVenderProducts(vender.VendorID)" variant="outline-success">
                  <b-icon icon="eye"></b-icon> View Products
                </b-button>
              </div>
            </div>
          </div>
        </b-row>
      </b-col>
      <b-col md="1"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
//import router from "../router";
import VendorTypesButtonsCom from "@/components/global/VendorTypesButtonsCom.vue";

const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "AllVenders",
  components: {
    VendorTypesButtonsCom
  },
  data() {
    return {
      venders: [],
    };
  },
  created() {
    this.getVendors();
  },
  methods: {
    GetAllVenderProducts(VenderId) {
      this.$router.push(`/VendorProds/${VenderId}`);
    },
    getVendorName(fullName) {
      // Split the full name into words and return the first word
      return fullName.trim().split(' ')[0];
    },
    async getVendors() {
      try {
        const response = await axios.get(`${apiUrl}/venders`);
        this.venders = response.data;
      } catch (error) {
        console.error('Error fetching venders:', error);
      }
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

.card-body {
  padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
}

.card-footer {
  padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
}

.btn {
  padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
}

.rowNew {
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}

.e-r5n0an {
  margin-bottom: 8px;
}

.e-tz4xap {
  position: relative;
  padding-top: 4px;
  padding-left: 0px;
  padding-right: 0px;
}

.e-1ucr7rw {
  overflow: auto hidden;
  scrollbar-width: none;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  gap: 8px;
  max-height: 58px;
  transition: max-height 200ms ease-in-out 0s;
  box-sizing: content-box;
}

.svg-container:hover svg path {
  fill: white;
}
</style>