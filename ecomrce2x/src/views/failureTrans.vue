<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body text-center">
                        <h1 class="display-4">Payment Failed</h1>
                        <p class="lead">{{ message }}</p>
                        <router-link to="/" class="btn btn-danger">Try Another Card</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name:"failureTrans",
    data() {
        return {
            message: ''
        };
    },
    created() {
        // Retrieve the message parameter from the route
        this.message = this.$route.params.message || 'Payment failed. Please try another card.';
    }
};
</script>
  
<style scoped>
/* Add your custom styling here */
</style>
  