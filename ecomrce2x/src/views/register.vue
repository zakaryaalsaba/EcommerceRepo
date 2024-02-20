<template>
  <b-container class="bv-example-row my-4 mx-auto p-5 bg-white">
    <b-row class="justify-content-center">
      <b-col sm="12" md="8">
        <div class="d-flex justify-content-between align-items-center flex-column gap-2 gap-sm-0 flex-sm-row">
          <h3 class="m-0 fw-bold">Sign Up!</h3>
          <h6 class="m-0 fw-bold login">
            Are you a member?
            <b-link to="/login" class="text-decoration-none fw-bold text-success">
              Sign In Now
            </b-link>
          </h6>
        </div>
        <b-form @submit.prevent="onSubmit" class="py-3">
          <!-- <b-form action="http://localhost:3000/users" method="POST" class="py-3"> -->
          <b-form-input id="username" name="UserName" v-model="user.UserName" type="text" placeholder="Username"
            class="mb-3 p-2 bg-white" required></b-form-input>
          <b-form-input id="FirstName" name="FirstName" v-model="user.FirstName" type="text" placeholder="FirstName"
            class="mb-3 p-2 bg-white" required></b-form-input>
          <b-form-input id="LastName" name="LastName" v-model="user.LastName" type="text" placeholder="LastName"
            class="mb-3 p-2 bg-white"></b-form-input>
          <b-form-input id="PhoneNumber" name="PhoneNumber" v-model="user.PhoneNumber" type="number"
            placeholder="Phone Number" class="mb-3 p-2 bg-white" required></b-form-input>
          <b-form-input id="email" v-model="user.Email" type="email" placeholder="Email" class="mb-3 p-2 bg-white"
            required></b-form-input>
          <b-form-input id="input-5" v-model="user.Password" type="password" placeholder="Password"
            class="mb-3 p-2 bg-white" required></b-form-input>

          <div class="form-floating" v-show="false">
            <b-form-input type="UserTypeId" name="UserTypeId" class="form-control" id="UserTypeId" placeholder=""
              v-model="user.UserTypeId" />
            <label for="floatingInput">UserTypeId</label>
          </div>

          <div class="form-floating" v-show="false">
            <b-form-input type="StatusId" name="StatusId" class="form-control" id="UserTypeId" placeholder="StatusId"
              v-model="user.StatusId" />
            <label for="floatingInput">StatusId</label>
          </div>
          <b-button type="submit" variant="success" class="fw-bold p-2 text-uppercase w-100">Sign Up</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import router from "../router";
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "register",
  data() {
    return {
      user: {
        UserName: "UserNameTEST 6",
        FirstName: "FirstName TEST 6",
        LastName: "LastName TEST 6",
        Email: "Email@email333.com",
        Password: "Password TEST 6",
        PhoneNumber: "20002222",
        MobileNumber: "MobileNumber TEST 6",
        UserTypeId: 1,
        StatusId: 1
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log('response');
      await axios.post(`${apiUrl}/users/register`,
        {
          "UserName": "UserNameTEST 6",
          "FirstName": "FirstName TEST 6",
          "LastName": "LastName TEST 6",
          "Email": "Email@email333.com",
          "Password": "Password TEST 6",
          "PhoneNumber": "PhoneNumber TEST 6",
          "MobileNumber": "MobileNumber TEST 6",
          "UserTypeId": 1,
          "StatusId": 1
        },
        {
          headers: {
            'Content-type': 'application/json',
          }
        }).then(response => {
          console.log(response);
          router.push({ name: "/" });
        });

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
  