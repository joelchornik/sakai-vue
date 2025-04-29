<script setup>
import ArticuloCrudo from '@/components/ArticuloCrudo/ArticuloCrudo.vue';
import PedidoProduccion from '@/components/PedidoProduccion/PedidoProduccion.vue';
import Pieza from '@/components/Pieza/Pieza.vue';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget.vue';
import StatsWidget from '@/components/dashboard/StatsWidget.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <StatsWidget />

        <div class="col-span-12 xl:col-span-6">
            <ArticuloCrudo />
            <Pieza />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <PedidoProduccion />
            <NotificationsWidget />
        </div>
    </div>
</template>
