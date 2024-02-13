import {SET_AUTHENTICATED, SET_USER} from "./types.js";

const authData = window._authUser;
export default {
    namespaced: true,
    state: () => ({
        signedIn: authData.signedIn,
        user: authData.user,
    }),
    getters: {
        signedIn(state) {
            return state.signedIn;
        },
        user(state) {
            return state.user;
        }
    },
    mutations: {
        [SET_AUTHENTICATED](state, payload) {
            state.signedIn = payload;
        },
        [SET_USER](state, payload) {
            state.user = payload;
        }
    },
    actions: {
        login({commit}, payload) {
            commit(SET_AUTHENTICATED, payload.signedIn);
            commit(SET_USER, payload.user);
        },
        logout({commit}) {
            commit(SET_AUTHENTICATED, false);
            commit(SET_USER, null);
        }
    }
}
