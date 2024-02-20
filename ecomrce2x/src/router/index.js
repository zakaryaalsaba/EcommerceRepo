import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/AllVenders.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/AllProd",
    name: "AllProd",
    component: () => import("../views/AllProd.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/PlaceOrder",
    name: "PlaceOrder",
    component: () => import("../views/PlaceOrder.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/CheckOut",
    name: "CheckOut",
    component: () => import("../views/CheckOut.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/MyBaskets",
    name: "MyBaskets",
    component: () => import("../views/MyBaskets.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/successTrans",
    name: "successTrans",
    component: () => import("../views/successTrans.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/failureTrans",
    name: "failureTrans",
    component: () => import("../views/failureTrans.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/cancelTrans",
    name: "cancelTrans",
    component: () => import("../views/cancelTrans.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: () => import("../views/forgetPassword.vue"),
  },
  {
    path: "/prodAutoSearch",
    name: "prodAutoSearch",
    component: () => import("../views/prodAutoSearch.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ProceedToCheckout",
    name: "ProceedToCheckout",
    component: () => import("../views/ProceedToCheckout.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/orderItems/:id",
    name: "orderItems",
    component: () => import("../views/orderItems.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/VendorOrders",
    name: "VendorOrders",
    component: () => import("../views/VendorOrders.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/CustOrders",
    name: "CustOrders",
    component: () => import("../views/CustOrders.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ProdsByName/:id",
    name: "ProdsByName",
    component: () => import("../views/ProdsByName.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/cart/:id",
    name: "cart",
    component: () => import("../views/cart.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/AllVenders",
    name: "AllVenders",
    component: () => import("../views/AllVenders.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/venderDetails/:id",
    name: "venderDetails",
    component: () => import("../views/venderDetails.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/VendorProds/:id",
    name: "VendorProds",
    component: () => import("../views/VendorProds.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/productDetails/:id",
    name: "productDetails",
    component: () => import("../views/productDetails.vue"),
    meta: { requiresAuth: true },
  }
  ,
  {
    path: "/Product/:id/:name/:image/:desc/:price",
    name: "Product",
    component: () => import("../views/ProdDet.vue"),
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/products",
  //   name: "products",
  //   component: () => import("../views/AllProd.vue"),
  //   meta: { requiresAuth: true },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log('requiresAuth = ' + requiresAuth)
  console.log('isAuthenticated= ' + isAuthenticated)

  if (requiresAuth && !isAuthenticated) {
    // Redirect to the login page if authentication is required but the user is not authenticated
    console.log('it should be login')
    next('/Login');
  } else if (isAuthenticated && to.name === 'Login') {
    // Redirect to the dashboard page if the user is authenticated and trying to access the login page
    console.log('it should be AllVenders')
    next('/AllVenders');
  } else {
    // Continue with the navigation
    console.log('just else')
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
//   const auth = getAuth();
//   const currentUser = auth.currentUser;

//   if (requiresAuth && !currentUser) {
//     next("/login");
//   } else if (requiresAuth && currentUser) {
//     next();
//   } else {
//     next();
//   }
// });
export default router;
