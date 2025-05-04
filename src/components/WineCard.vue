<template>
    <div class="wine-card-component">
        <div v-if="!wineSheet" class="no-data">
            <p>No wine tasting sheet data available.</p>
        </div>

        <div v-else class="wine-details">
            <div class="wine-card card">
                <div class="wine-card-header">
                    <h3>{{ wineSheet.denomination }}</h3>
                    <span class="wine-type" :class="getWineTypeClass(wineSheet.wineType)">
                        {{ wineTypeLabels[wineSheet.wineType] }}
                    </span>
                </div>
                <div class="wine-card-details">
                    <p><strong>Producer:</strong> {{ wineSheet.producer }}</p>
                    <p><strong>Vintage:</strong> {{ wineSheet.vintage }}</p>
                    <p><strong>Classification:</strong> {{
                        wineClassificationLabels[wineSheet.classification]
                        }} </p>
                    <p><strong>Tasted on:</strong> {{ formatDate(wineSheet.date) }}</p>
                </div>
                <div class="wine-card-actions">
                    <router-link :to="`/detail/${wineSheet.id}`" class="btn btn-sm">
                        View Details
                    </router-link>
                    <router-link :to="`/edit/${wineSheet.id}`" class="btn btn-sm btn-secondary">
                        Edit
                    </router-link>
                    <button @click="tryDelete()" class="btn btn-sm btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirm Deletion</h2>
                <button class="modal-close" @click="rollBackDelete">&times;</button>
            </div>
            <div class="modal-body">
                <p>
                    Are you sure you want to delete the tasting sheet for
                    <strong>{{ wineSheet?.denomination }}</strong> by
                    <strong>{{ wineSheet?.producer }}</strong>?
                </p>
                <p class="warning-text">This action cannot be undone.</p>
                <div class="modal-actions">
                    <button @click="rollBackDelete" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button @click="confirmDelete" class="btn btn-danger">
                        Delete
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

const showDeleteConfirm = ref(false);
const props = defineProps<{
    wineSheet: WineTastingSheet | null;
}>();

const emits = defineEmits<{
    delete: [wineSheetId: string],
}>()

function tryDelete() {
    showDeleteConfirm.value = true;
}

function rollBackDelete() {
    showDeleteConfirm.value = false;
}

function confirmDelete() {
    showDeleteConfirm.value = false;
    emits('delete', props.wineSheet!.id);
}
</script>


<style scoped>
.wine-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.wine-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
}

.wine-card-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.wine-type {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
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

.wine-card-details {
    flex-grow: 1;
    margin-bottom: 1rem;
}

.wine-card-details p {
    margin-bottom: 0.5rem;
}

.wine-card-actions {
    display: flex;
    gap: 0.5rem;
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

.import-section,
.export-section {
    margin-bottom: 2rem;
}

.import-section h3,
.export-section h3 {
    margin-bottom: 1rem;
}

.warning-text {
    color: #721c24;
    background-color: #f8d7da;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.file-input-container {
    margin-bottom: 1rem;
}

.file-input-container input[type="file"] {
    display: none;
}

@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .action-buttons {
        margin-top: 1rem;
        width: 100%;
    }

    .wine-list {
        grid-template-columns: 1fr;
    }

    .wine-card-actions {
        flex-direction: column;
    }
}
</style>