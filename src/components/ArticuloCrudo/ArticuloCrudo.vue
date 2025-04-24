<script setup>
import ArticuloCrudoService from '@/service/ArticuloCrudo/ArticuloCrudoService';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';
const { data, isLoading, isFetching, refetch } = ArticuloCrudoService.get({ PageSize: 100 });

// non-api related stuff
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const datatable = ref();
const exportCSV = () => datatable.value.exportCSV();
</script>

<template>
    <div class="card">
        <DataTable ref="datatable" :isLoading="isLoading" :value="data?.items" :rows="10" :paginator="true" responsiveLayout="scroll" :filters="filters">
            <template #header>
                <div class="flex items-center justify-between gap-2">
                    <div class="flex-grow-1 mr-2">
                        <div class="font-semibold text-xl mb-4">Artículos Crudos</div>
                    </div>
                    <div class="flex flex-none">
                        <span class="p-input-icon-left mr-2">
                            <InputText v-model="filters['global'].value" placeholder="Buscar" class="w-8rem" />
                        </span>
                        <span class="flex flex-nowrap">
                            <Button icon="pi pi-plus" class="p-button-primary mx-1"></Button>
                            <Button icon="pi pi-download" class="p-button-primary mx-1" @click="exportCSV($event)" />
                            <Button icon="pi pi-refresh" class="p-button-primary mx-1" @click="refetch" :loading="isFetching"></Button>
                            <Button icon="pi pi-question-circle" class="p-button-primary mx-1" />
                        </span>
                    </div>
                </div>
            </template>
            <Column field="dscArticuloCrudo" header="Artículo" :sortable="true" style="width: 35%"></Column>
            <Column field="pesoSTD" header="Peso Estándar" :sortable="true" style="width: 10%"> </Column>
            <Column field="anchoSTD" header="Ancho Estándar" :sortable="true" style="width: 10%"> </Column>
            <Column field="rindeSTD" header="Rinde Estándar" :sortable="true" style="width: 10%"> </Column>
            <Column style="width: 15%" header="Detalle">
                <template #body>
                    <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
