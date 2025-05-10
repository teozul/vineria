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
                        <span class="wine-type" :class="getWineTypeClass(sheet.wineType)">
                            {{ wineTypeLabels[sheet.wineType] }}
                        </span>
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

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{ Labels.confirmDeletion }}</h2>
                <button class="modal-close" @click="rollBackDelete">&times;</button>
            </div>
            <div class="modal-body">
                <p>
                    {{ Labels.confirmDeletionMessage }}
                    <strong>{{ selectedWine?.denomination }}</strong>
                    {{ Labels.by }}
                    <strong>{{ selectedWine?.producer }}</strong>?
                </p>
                <p class="warning-text">{{ Labels.confirmDeletionWarning }}</p>
                <div class="modal-actions">
                    <button @click="rollBackDelete" class="btn btn-secondary">
                        {{ Labels.cancel }}
                    </button>
                    <button @click="confirmDelete" class="btn btn-danger">
                        {{ Labels.delete }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { WineTastingSheet, wineClassificationLabels, wineTypeLabels } from '@/models/WineTastingSheet';
import { getWineTypeClass } from '@/helpers/WineUtils';
import { formatDate } from '@/helpers/DateUtils';
import { Labels } from '@/helpers/Labels';

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

.actions-cell {
    white-space: nowrap;
}

.actions-cell .btn {
    margin-right: 0.5rem;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.modal-body {
    padding: 1.5rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
}

.warning-text {
    color: #721c24;
    background-color: #f8d7da;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
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