import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    loginUser({ commit }, { token, user }) {
      commit('setToken', token);
      commit('setUser', user);
    },
    logoutUser({ commit }) {
      commit('logout');
    },
    async fetchUserData({ commit }) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        commit('setUser', user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
});

export default store;
