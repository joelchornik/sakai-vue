<script setup>
import PedidoProduccionView from '@/components/PedidoProduccion/PedidoProduccionView.vue';
import PiezaService from '@/service/Pieza/PiezaService';

import { ref } from 'vue';

// get cdgNumeroPieza from component prop id
const props = defineProps({
    cdgNumeroPieza: {
        type: String,
        required: true
    }
});

const cdgNumeroPieza = ref(props.cdgNumeroPieza);
const { data, isLoading, isFetching, refetch } = PiezaService.getById(cdgNumeroPieza);
</script>

<template>
    <!-- loader-->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
        <i class="pi pi-spin pi-spinner text-4xl"></i>
    </div>
    <div class="w-full" v-if="data?.cdgNumeroPieza && !isLoading">
        <div class="col-span-12">
            <PedidoProduccionView :cdgPedidoProduccion="data?.cdgPedidoProduccion" />
        </div>

        <div class="col-span-12">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">#Pieza {{ data?.cdgNumeroPieza }}</span>

                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ data?.kilos }} Kg</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ data?.ancho }} Ancho</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ data?.metros }} Metros</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Calidad {{ data?.dscCalidad }}</div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Revisado {{ data?.dscCalidad }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
