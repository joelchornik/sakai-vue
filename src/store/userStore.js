import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null // Load user from localStorage
    }),
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user)); // Persist user to localStorage
        },
        clearUser() {
            this.user = null;
            localStorage.removeItem('user'); // Clear user from localStorage
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user // Returns true if a user is logged in
    }
});
