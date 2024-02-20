<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body text-center">
            <h1 class="display-4">Payment Successful</h1>
            <p class="lead">{{ message }}</p>
            <router-link to="/" class="btn btn-primary">Back to Home</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "successTrans",
  data() {
    return {
      message: ''
    };
  },
  created() {
    // Retrieve the message parameter from the route
    this.message = this.$route.params.message || 'Thanks for your payment!';
  }
};
</script>

<style scoped>
/* Add your custom styling here */
</style>
