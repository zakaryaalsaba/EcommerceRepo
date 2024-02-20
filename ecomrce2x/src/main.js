import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin, BModal } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//import { library } from '@fortawesome/fontawesome-svg-core';
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//import { faUser, faEnvelope, faAddressCard, faInstitution, faShoppingCart, faCcVisa, faCcAmex, faCcMastercard, faCcDiscover } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';

// Add the Font Awesome icons to the library
//library.add(faUser, faEnvelope, faAddressCard, faInstitution, faShoppingCart, faCcVisa, faCcAmex, faCcMastercard, faCcDiscover);

// Register the Font Awesome component globally
//Vue.component('font-awesome-icon', FontAwesomeIcon);

// Add additional Font Awesome icons
//library.add(faTwitter, faFacebook, faStackOverflow, faGithub, faGoogle, faLinkedin);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component('b-modal', BModal);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app');
