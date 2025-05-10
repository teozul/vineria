<template>
    <span class="wine-type" :class="getWineTypeClass(wineType)">
        {{ wineTypeLabels[wineType] }}
    </span>
</template>

<script setup lang="ts">
import { WineType, wineTypeLabels } from '@/models/WineTastingSheet';
import { getWineTypeClass } from '@/helpers/WineUtils';

defineProps<{
    wineType: WineType;
}>();
</script>

<style scoped>
.wine-type {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    display: inline-block;
}

.wine-type-red {
    background-color: #722F37;
    color: #ffffff;
}

.wine-type-white {
    background-color: #fff3cd;
    color: #856404;
}

.wine-type-rose {
    background-color: #f4c4bb;
    color: #58151c;
}
</style> 