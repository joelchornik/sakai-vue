<script setup>
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const user = userStore.user;

const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    userStore.setUser(null);
    window.location.reload(); // Reload to reset the app state
};
</script>

<template>
    <div
        class="config-panel hidden absolute top-[3.25rem] right-0 w-48 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"
    >
        <div class="text-lg">{{ user?.name }}</div>
        <button class="text-lg pt-2" @click="logout">Cerrar Sesión</button>
    </div>
</template>
