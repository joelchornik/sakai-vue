<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Inicio',
        items: [
            { label: 'Tablero', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Reportes', icon: 'pi pi-fw pi-chart-line', to: '/reportes' },
            { label: 'Comercial', icon: 'pi pi-fw pi-dollar', to: '/comercial' }
        ]
    },
    {
        label: 'Maestros',
        items: [
            { label: 'Artículos Crudos', icon: 'pi pi-fw pi-book', to: '/maestros/articulos/crudos' },
            { label: 'Artículos Terminados', icon: 'pi pi-fw pi-book', to: '/maestros/articulos/terminados' },
            { label: 'Artículos en Proceso', icon: 'pi pi-fw pi-book', to: '/maestros/articulos/proceso' },
            { label: 'Químicos & Colorantes', icon: 'pi pi-fw pi-book', to: '/maestros/quimicos' }
        ]
    },
    {
        label: 'Artículos Crudos',
        items: [
            { label: 'ABM', icon: 'pi pi-fw pi-book', to: '/articulos/crudos' },
            { label: 'Informes', icon: 'pi pi-fw pi-book', to: '/articulos/terminados' }
        ]
    },
    {
        label: 'Producción',
        items: [
            { label: 'Producción', icon: 'pi pi-fw pi-book', to: '/produccion' },
            { label: 'Producción en Proceso', icon: 'pi pi-fw pi-book', to: '/produccion/proceso' }
        ]
    },
    {
        label: 'Logística',
        items: [
            { label: 'Logística', icon: 'pi pi-fw pi-book', to: '/logistica' },
            { label: 'Logística en Proceso', icon: 'pi pi-fw pi-book', to: '/logistica/proceso' }
        ]
    },
    {
        label: 'Herramientas',
        items: [{ label: 'QR Scanner', icon: 'pi pi-fw pi-camera', to: '/qr-scanner' }]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item.label">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
