<script setup>
import PedidoProduccionService from '@/service/PedidoProduccion/PedidoProduccionService';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';
const { data, isLoading, isFetching, refetch } = PedidoProduccionService.get({ PageSize: 100 });

// non-api related stuff
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const datatable = ref();
const exportCSV = () => datatable.value.exportCSV();
</script>

<template>
    <div class="card">
        <DataTable ref="datatable" :isLoading="isLoading" :value="data?.items" :rows="6" :paginator="true" responsiveLayout="scroll" :filters="filters">
            <template #header>
                <div class="flex flex-wrap items-center justify-between">
                    <div class="flex-grow-1 mr-2">
                        <div class="font-semibold text-xl mb-4">Pedidos a Producción</div>
                    </div>
                    <div class="flex flex-none">
                        <span class="p-input-icon-left mr-2">
                            <InputText v-model="filters['global'].value" placeholder="Buscar" class="w-3rem" />
                        </span>
                        <span class="flex flex-nowrap">
                            <Button icon="pi pi-plus" class="p-button-primary mx-1"></Button>
                            <Button icon="pi pi-download" class="p-button-primary mx-1" @click="exportCSV($event)" />
                            <Button icon="pi pi-refresh" class="p-button-primary mx-1" @click="refetch" :loading="isFetching"></Button>
                        </span>
                    </div>
                </div>
            </template>
            <Column field="cdgPedidoProduccion" header="#PP" :sortable="true" style="width: 10%"> </Column>
            <Column field="dscEstadoPedidoProduccion" header="Estado" :sortable="true" style="width: 10%"> </Column>
            <Column field="dscArticulo" header="Artículo" :sortable="true" style="width: 35%"></Column>
            <Column field="kilosPedido" header="Kg" :sortable="true" style="width: 10%"> </Column>
            <Column field="metrosPedido" header="Metros" :sortable="true" style="width: 10%"> </Column>
            <Column style="width: 15%" header="Detalle">
                <template #body>
                    <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
