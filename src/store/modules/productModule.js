import {Product} from "@/models/Product.js";

export const productModule = {
    state: () => ({
        product: null
    }),
    getters: {
        currentProduct(state) {
            return state.product;
        }
    },
    mutations: {
        setProduct(state, product) {
            state.product = new Product(product);
        },
    },
    actions: {
        rememberProduct({ commit }, product) {
            commit("setProduct", product);
        }
    },
    namespaced: true,
};