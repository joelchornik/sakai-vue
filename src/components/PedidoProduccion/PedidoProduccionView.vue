<script setup>
import PedidoProduccionService from '@/service/PedidoProduccion/PedidoProduccionService';
import { ref } from 'vue';

// get cdgNumeroPieza from component prop id
const props = defineProps({
    cdgPedidoProduccion: {
        type: String,
        required: true
    }
});

const cdgPedidoProduccion = ref(props.cdgPedidoProduccion);
console.log(cdgPedidoProduccion.value);
const { data, isLoading, isFetching, refetch } = PedidoProduccionService.getById(cdgPedidoProduccion);
</script>

<template>
    <!-- loader-->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
        <i class="pi pi-spin pi-spinner text-4xl"></i>
    </div>
    <div class="w-full" v-if="data?.cdgPedidoProduccion && !isLoading">
        <div class="col-span-12">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">#PP {{ data?.cdgPedidoProduccion }}</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Articulo: {{ data?.dscArticulo }}</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Color: {{ data?.dscColor }}</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Kilos PP: {{ data.kilosPedido }} Kg</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Estado PP: {{ data.dscEstadoPedidoProduccion }}</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Fecha PP: {{ data.fechaPedido }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
