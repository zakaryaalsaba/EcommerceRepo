<template>
  <b-container class="bv-example-row my-4 mx-auto p-5 bg-white">
    <b-row class="justify-content-center">
      <b-col sm="12" md="8">
        <div class="d-flex justify-content-between align-items-center flex-column gap-2 gap-sm-0 flex-sm-row">
          <h3 class="m-0 fw-bold">Forgot Password!</h3>
          <h6 class="m-0 register">
            Enter your email address to reset your password.
          </h6>
        </div>
        <b-form @submit.prevent="onSubmit" class="pt-3 pb-3">
          <b-form-input id="input-1" type="email" placeholder="Enter your email" class="mb-3 p-2 bg-white shadow-3"
            required></b-form-input>

          <b-button type="submit" class="fw-bold p-2 text-uppercase w-100">Submit</b-button>
        </b-form>
        <b-row class="fogetpass mb-3">
          <b-link to="/register" class="text-decoration-none fw-bold text-success">
            Sign Up Now
          </b-link>
          <b-link to="/Login" class="text-decoration-none fw-bold text-success">
            Sign In
          </b-link>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'forgetPassword',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    submitForm() {
      // Handle the form submission logic (e.g., send a reset password link to the provided email)
      console.log('Email submitted:', this.email);
      // You may want to call an API to send a reset password link
      // and handle the response accordingly.
      // For simplicity, the logic is not implemented here.
    },
  },
};
</script>
  
<style lang="scss" scoped>
@import "@/assets/main.scss";

.container {
  form {
    input {
      outline: none;
      border: 1px solid #ced4da;
      transition: 0.6s ease;

      &::placeholder {
        color: #ced4da;
        font-weight: 600;
      }

      &:focus {
        box-shadow: 1px -1px 6px #ced4da;
      }
    }

    button {
      background: $color-global;
      border: 1px solid $color-global;
    }
  }

  .fogetpass {
    a {
      color: $color-global;
    }
  }
}
</style>