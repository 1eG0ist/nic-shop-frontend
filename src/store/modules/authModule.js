import {User} from "@/models/User.js";

export const authModule = {
    state: () => ({
        user: null,
    }),
    getters: {
        isAuthenticated(state) {
            return state.user !== null;
        },
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = new User(user);
        },
        clearUser(state) {
            state.user = null;
        },
        initializeUser(state) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                state.user = user;
            }
        },
    },
    actions: {
        loginUser({ commit }, user) {
            commit('setUser', user);
        },
        logoutUser({ commit }) {
            commit('clearUser');
        },
        initializeUser({ commit }) {
            commit('initializeUser');
        },
    },
    namespaced: true,
};
