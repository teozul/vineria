<template>
    <div class="wine-card-component">
        <div v-if="!wineSheet" class="no-data">
            <p>No wine tasting sheet data available.</p>
        </div>

        <div v-else class="wine-details">
            <div class="wine-card card">
                <div class="wine-card-header">
                    <h3>{{ wineSheet.denomination }}</h3>
                    <WineTypeBadge :wine-type="wineSheet.wineType" />
                </div>
                <div class="wine-card-details">
                    <p><strong>{{ Labels.producer }}:</strong> {{ wineSheet.producer }}</p>
                    <p><strong>{{ Labels.vintage }}:</strong> {{ wineSheet.vintage }}</p>
                    <p><strong>{{ Labels.classification }}:</strong> {{
                        wineClassificationLabels[wineSheet.classification]
                    }} </p>

                    <p><strong>{{ Labels.tastedOn }}:</strong> {{ formatDate(wineSheet.date) }}</p>
                </div>
                <div class="wine-card-actions">
                    <router-link :to="`/detail/${wineSheet.id}`" class="btn btn-sm">
                        {{ Labels.details }}
                    </router-link>
                    <router-link :to="`/edit/${wineSheet.id}`" class="btn btn-sm btn-secondary">
                        {{ Labels.edit }}
                    </router-link>
                    <button @click="tryDelete()" class="btn btn-sm btn-danger">
                        {{ Labels.delete }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <DeleteConfirmationModal
        :show="showDeleteConfirm"
        :item="wineSheet"
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

const showDeleteConfirm = ref(false);
const props = defineProps<{
    wineSheet: WineTastingSheet | null;
}>();

const emits = defineEmits<{
    delete: [wineSheetId: string],
}>();

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

@media (max-width: 768px) {
    .wine-card-actions {
        flex-direction: column;
    }
}
</style>