import {OrderCell} from "@/models/OrderCell.js";

export const cartModule = {
    state: () => ({
        orderCells: [],
    }),
    mutations: {
        ADD_TO_CART(state, product) {
            const existingOrderCell = state.orderCells.find(cell => cell.product.id === product.id);
            if (existingOrderCell) {
                existingOrderCell.plus1();
            } else {
                state.orderCells.push(new OrderCell(product));
            }
        },
        INCREASE_QUANTITY(state, productId) {
            const orderCell = state.orderCells.find(cell => cell.product.id === productId);
            if (orderCell) {
                orderCell.plus1();
            }
        },
        DECREASE_QUANTITY(state, productId) {
            const orderCell = state.orderCells.find(cell => cell.product.id === productId);
            if (orderCell && orderCell.count > 1) {
                orderCell.minus1();
            } else {
                state.orderCells = state.orderCells.filter(cell => cell.product.id !== productId);
            }
        },
        REMOVE_FROM_CART(state, productId) {
            state.orderCells = state.orderCells.filter(cell => cell.product.id !== productId);
        },
        CLEAR_CART(state) {
            state.orderCells = [];
        },
    },
    actions: {
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
    },
    getters: {
        totalItemsInCart(state) {
            return state.orderCells.reduce((total, cell) => total + cell.count, 0);
        },
    },
    namespaced: true,
};