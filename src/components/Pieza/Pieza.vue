<script setup>
import PiezaService from '@/service/Pieza/PiezaService';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';
const { data, isLoading, isFetching, refetch } = PiezaService.get({ PageSize: 100 });

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
                        <div class="font-semibold text-xl mb-4">Piezas</div>
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
            <Column field="cdgNumeroPieza" header="#Pieza" :sortable="true" style="width: 10%"> </Column>
            <Column field="kilos" header="Kg" :sortable="true" style="width: 10%"> </Column>
            <Column field="metros" header="Metros" :sortable="true" style="width: 10%"> </Column>
            <Column field="ancho" header="Ancho" :sortable="true" style="width: 10%"> </Column>
            <Column style="width: 15%" header="Detalle">
                <template #body>
                    <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
