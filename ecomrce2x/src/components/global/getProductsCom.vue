<template>
    <b-row>
        <b-col md="1"></b-col>
        <b-col md="10">
            <div class="rowNew" v-if="products.length > 0">
                <div class="card" v-for="product in products" :key="product.ProductID"
                    style="max-width: 20rem; margin: 10px;">
                    <router-link :to="`/productDetails/${product.ProductID}`">
                        <img class="card-img-top" width="120px" height="220px"
                            :src="`../../images/products/1/1_${product.ProductID}_${product.ImageName}.jpg`"
                            alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <router-link :to="`/productDetails/${product.ProductID}`">
                            <p class="card-title">{{ product.ProductName }}</p>
                        </router-link>
                        <p class="card-text">{{ product.Description }}</p>
                    </div>
                    <div class="card-footer">
                        <span style="font-size: 16px; color: #fa6338; font-weight: 700">
                            ${{ Number(product.Price).toFixed(2) }}
                        </span>
                        <AddToCartCom :productId="product.ProductID" :QuantityPrp="1" :priceProp="product.Price" />
                    </div>
                </div>
            </div>
            <div v-else>
                <b-alert show variant="info">Sorry, There are no Products have been added yet..</b-alert>
            </div>
        </b-col>
        <b-col md="1"></b-col>
    </b-row>
</template>
  
<script>
import axios from 'axios';
import AddToCartCom from "@/components/global/AddToCartCom.vue";
//import AddToFavorite from "@/components/global/AddToFavorite.vue";
const apiUrl = process.env.VUE_APP_API_URL;

export default {
    name: "getProductsCom",
    props: {
        venderIdProp: String,
        productIdProp: Number,
    },
    components: {
        AddToCartCom,
        //AddToFavorite
    },
    data() {
        return {
            products: [],
        };
    },
    watch: {
        productIdProp(newProductId) {
            this.productIdProp && this.getProductById(newProductId);
        },
        // venderIdProp(newVenderId) {
        //     newVenderId !== -1 && this.getvendorProducts(newVenderId);
        // },
    },
    created() {
        //This for the AutoComplete
        console.log('this.productIdProp = ' + this.productIdProp)
        console.log('this.venderIdProp = ' + this.venderIdProp)

        if (this.productIdProp && this.productIdProp > -1) {
            console.log('insid this.productIdProp = ' + this.productIdProp)

            this.getProductById(this.productIdProp)
            return;
        }
        //either call get all products or get products by vender id
        if (this.venderIdProp == -1) {
            console.log('this.venderIdProp = -1 ' + this.venderIdProp)

            this.getProducts();
            return;
        }
        console.log('this.venderIdProp - line 85 = ' + this.venderIdProp)
        this.getvendorProducts(this.venderIdProp);

    },
    methods: {
        async getProducts() {
            try {
                const response = await axios.get(`${apiUrl}/products`);
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async getvendorProducts(venderId) {
            try {
                console.log('getvendorProducts - venderId = ' + venderId)

                const response = await axios.get(`${apiUrl}/vendorProducts/${venderId}`);
                this.products = response.data;
                console.log(this.products);
                console.log('Done fetching products:');

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async getProductById(id) {
            try {
                const response = await axios.get(`${apiUrl}/products/id/${id}`);
                this.product = response.data;
                console.log('this product')
                console.log(this.product)

                if (this.product) {
                    //await this.fetchProductsByName(this.product.ProductName.substring(0, this.product.ProductName.length - 3));
                    await this.fetchProductsByName(this.product.ProductName);

                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },
        async fetchProductsByName(name) {
            try {
                const response = await fetch(`${apiUrl}/products/${name}`);
                const data = await response.json();
                this.products = data;
                this.$emit('updateProducts', this.products);
            } catch (error) {
                console.error('Error fetching products by name:', error);
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
</style>