import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { jwtDecode } from 'jwt-decode';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useUserStore } from './store/userStore'; // Import the user store

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.use(VueQueryPlugin, { queryClient: new QueryClient() });

// Load user info into Pinia store on app initialization
const userStore = useUserStore();
const token = localStorage.getItem('accessToken');
if (token) {
    try {
        const decodedToken = jwtDecode(token);
        userStore.setUser({ name: decodedToken?.['name'], sub: decodedToken?.['sub'] }); // Ensure name is stored
    } catch (error) {
        console.error('Invalid JWT token:', error);
        router.push('/auth/login'); // Redirect to login on invalid token
    }
} else {
    router.push('/auth/login'); // Redirect to login if no token is found
}

app.mount('#app');
