import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedInUser: null,
    token: null,
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    loginUser({ commit }, payload) {
      commit('setLoggedInUser', payload.user);
      commit('setToken', payload.token);
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return state.loggedInUser !== null && state.token !== null;
    },
  },
});