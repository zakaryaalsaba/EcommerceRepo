<template>
  <b-container class="bv-example-row my-4 mx-auto p-5 bg-white">
    <b-row class="justify-content-center">
      <b-col sm="12" md="8">
        <div class="d-flex justify-content-between align-items-center flex-column gap-2 gap-sm-0 flex-sm-row">
          <h3 class="m-0 fw-bold">Sign In!</h3>
          <h6 class="m-0 fw-bold register">
            Not a member yet?
            <b-link to="/register" class="text-decoration-none fw-bold text-success">
              Sign Up Now!
            </b-link>
          </h6>
        </div>
        <b-form @submit.prevent="onSubmit" class="pt-3 pb-3">
          <b-form-input id="input-1" v-model="user.UserName" type="email" placeholder="Username Or Email"
            class="mb-3 p-2 bg-white shadow-3" required></b-form-input>

          <b-form-input id="input-2" v-model="user.password" type="password" placeholder="Password"
            class="mb-3 p-2 bg-white" required></b-form-input>

          <b-button type="submit" class="fw-bold p-2 text-uppercase w-100">Login</b-button>
        </b-form>
        <b-row class="fogetpass mb-3">
          <b-link to="/forgetpassword" class="text-decoration-none fw-bold text-success">
            Forgot your password?
          </b-link>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
//import router from "../router";
//import axios from 'axios';
//import store from '@/store'
//const apiUrl = process.env.VUE_APP_API_URL;
//const apiUrlaws = process.env.VUE_APP_API_URL_AWS;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      user: {
        UserName: "Email10@email180.com",
        password: "123456",
      },
    };
  },
  methods: {
    async onSubmit() {
      this.getUser();

    },
    async getUser() {
      try {
        // const response = await axios.post(`${apiUrlaws}/users/login`, {
        //   "UserName": this.user.UserName,
        //   "Password": this.user.password
        // }, {
        //   headers: {
        //     'Content-type': 'application/json',
        //     'Access-Control-Allow-Origin': 'origin'
        //   }
        // });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "UserName": "Email10@email180.com",
          "Password": "123456"
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://f9c34lpira.execute-api.us-east-2.amazonaws.com/prod/users/login", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        // const loggedInUser = response.data;
        // const token = response.data.jwtToken;

        // if (loggedInUser && token) {
        //   localStorage.setItem('token', token);
        //   store.dispatch('loginUser', { user: loggedInUser, token });
        //   console.log('Authentication Succeed');
        //   router.push({ name: "dashboard" });
        // } else {
        //   console.log('Authentication failed');
        // }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
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
  