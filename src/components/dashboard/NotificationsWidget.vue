<script setup>
import { ref } from 'vue';

const menu = ref(null);

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);
</script>

<template>
    <div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Eventos</div>
            <div>
                <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu.toggle($event)"></Button>
                <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
            </div>
        </div>

        <span class="block text-muted-color font-medium mb-4">HOY</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-donwload !text-xl text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >PP 11340
                    <span class="text-surface-700 dark:text-surface-100">entró a depósito terminado <span class="text-primary font-bold">16:43hs</span></span>
                </span>
            </li>
            <li class="flex items-center py-2">
                <div class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-download !text-xl text-orange-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >PP 11276
                    <span class="text-surface-700 dark:text-surface-100">ensayo de laboratorio <a href="#">#204</a> <span class="text-primary font-bold">12:05hs</span></span>
                </span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">AYER</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-download !text-xl text-purple-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >PP 11340
                    <span class="text-surface-700 dark:text-surface-100">entró a depósito terminado <span class="text-primary font-bold">16:43hs</span></span>
                </span>
            </li>
            <li class="flex items-center py-2">
                <div class="w-12 h-12 flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-download !text-xl text-cyan-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >PP 11276
                    <span class="text-surface-700 dark:text-surface-100">ensayo de laboratorio <a href="#">#204</a> <span class="text-primary font-bold">12:05hs</span></span>
                </span>
            </li>
        </ul>
    </div>
</template>
