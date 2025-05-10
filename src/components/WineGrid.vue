<template>
    <div class="wine-grid">
        <table class="wine-table">
            <thead>
                <tr>
                    <th>{{ Labels.denomination }}</th>
                    <th>{{ Labels.producer }}</th>
                    <th>{{ Labels.vintage }}</th>
                    <th>{{ Labels.wineType }}</th>
                    <th>{{ Labels.classification }}</th>
                    <th>{{ Labels.tastedOn }}</th>
                    <th>{{ Labels.actions }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sheet in wineSheets" :key="sheet.id">
                    <td>{{ sheet.denomination }}</td>
                    <td>{{ sheet.producer }}</td>
                    <td>{{ sheet.vintage }}</td>
                    <td>
                        <WineTypeBadge :wine-type="sheet.wineType" />
                    </td>
                    <td>{{ wineClassificationLabels[sheet.classification] }}</td>
                    <td>{{ formatDate(sheet.date) }}</td>
                    <td class="actions-cell">
                        <router-link :to="`/detail/${sheet.id}`" class="btn btn-sm">
                            {{ Labels.viewDetails }}
                        </router-link>
                        <router-link :to="`/edit/${sheet.id}`" class="btn btn-sm btn-secondary">
                            {{ Labels.edit }}
                        </router-link>
                        <button @click="tryDelete(sheet)" class="btn btn-sm btn-danger">
                            {{ Labels.delete }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <DeleteConfirmationModal
        :show="showDeleteConfirm"
        :item="selectedWine"
        @cancel="rollBackDelete"
        @confirm="confirmDelete"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { WineTastingSheet, wineClassificationLabels } from '@/models/WineTastingSheet';
import { formatDate } from '@/helpers/DateUtils';
import { Labels } from '@/helpers/Labels';
import WineTypeBadge from './WineTypeBadge.vue';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';

const props = defineProps<{
    wineSheets: WineTastingSheet[];
}>();

const emits = defineEmits<{
    delete: [wineSheetId: string],
}>();

const showDeleteConfirm = ref(false);
const selectedWine = ref<WineTastingSheet | null>(null);

function tryDelete(wine: WineTastingSheet) {
    selectedWine.value = wine;
    showDeleteConfirm.value = true;
}

function rollBackDelete() {
    showDeleteConfirm.value = false;
    selectedWine.value = null;
}

function confirmDelete() {
    if (selectedWine.value) {
        emits('delete', selectedWine.value.id);
        showDeleteConfirm.value = false;
        selectedWine.value = null;
    }
}
</script>

<style scoped>
.wine-grid {
    width: 100%;
    overflow-x: auto;
}

.wine-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.wine-table th,
.wine-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.wine-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
}

.wine-table tr:hover {
    background-color: #f8f9fa;
}

.actions-cell {
    white-space: nowrap;
}

.actions-cell .btn {
    margin-right: 0.5rem;
}

@media (max-width: 768px) {
    .wine-table {
        font-size: 0.9rem;
    }

    .wine-table th,
    .wine-table td {
        padding: 0.75rem;
    }

    .actions-cell {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .actions-cell .btn {
        margin-right: 0;
    }
}
</style> 