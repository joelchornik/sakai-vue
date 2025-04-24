import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null // Holds the logged-in user object
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user // Returns true if a user is logged in
    }
});
