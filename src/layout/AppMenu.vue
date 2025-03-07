<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'IRFuzz',
        items: [
            { label: '初始配置', icon: 'pi pi-fw pi-bars', to: '/initconfig' },
            { label: '任务详情', icon: 'pi pi-fw pi-bars', to: '/tasks' },
            { label: '控制流图', icon: 'pi pi-fw pi-bars', to: '/controlflowgraph' },
            // { label: 'GPRC', icon: 'pi pi-fw pi-bars', to: '/grpc' },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
