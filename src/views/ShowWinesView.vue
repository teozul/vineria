<template>
    <div class="show-wine-cards-view">
        <div v-if="loading" class="loading-indicator">
            <p>{{ Labels.loading }}</p>
        </div>

        <div v-else>
            <!-- Show search input if there are no results or if there are results -->
            <div v-if="isSearching || wineSheets.length > 0">
                <div class="view-controls">
                    <div class="search-container">
                        <input type="text" v-model="searchQuery" @input="handleSearch"
                            :placeholder="Labels.searchWineSheets" class="search-input" />
                    </div>
                    <div class="view-switcher">
                        <button @click="currentView = 'cards'" 
                            :class="['btn', 'btn-sm', { 'btn-primary': currentView === 'cards' }]">
                            <i class="fas fa-th-large"></i> Cards
                        </button>
                        <button @click="currentView = 'grid'" 
                            :class="['btn', 'btn-sm', { 'btn-primary': currentView === 'grid' }]">
                            <i class="fas fa-table"></i> Grid
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="wineSheets.length === 0">
                <div v-if="isSearching" class="empty-state">
                    <div class="card">
                        <h3>{{ Labels.noResultsFound }}</h3>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <div class="card">
                        <h3>{{ Labels.noWineTastingSheets }}</h3>
                        <router-link to="/create" class="btn">{{ Labels.createNewWineTastingSheet }}</router-link>
                    </div>
                </div>
            </div>

            <div v-else>
                <WineGrid v-if="currentView === 'grid'" 
                    :wine-sheets="wineSheets" 
                    @delete="deleteSingleSheet" />
                <div v-else class="wine-list">
                    <div v-for="sheet in wineSheets" :key="sheet.id">
                        <WineCard :wine-sheet="sheet" @delete="deleteSingleSheet" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import WineCard from '@/components/WineCard.vue'
import WineGrid from '@/components/WineGrid.vue'
import { ref, onMounted, computed } from 'vue';
import { WineTastingSheet } from '../models/WineTastingSheet';
import { dataService } from '../services/DataService';
import { Labels } from '../helpers/Labels';

const wineSheets = ref<WineTastingSheet[]>([]);
const loading = ref(true);
const showDeleteConfirm = ref(false);
const searchQuery = ref('');
const currentView = ref<'cards' | 'grid'>('cards');

const isSearching = computed(() => searchQuery.value.trim().length > 0);

onMounted(async () => {
    try {
        wineSheets.value = await dataService.getAllSheets();
    } catch (error) {
        console.error('Error loading wine sheets:', error);
    } finally {
        loading.value = false;
    }
});

const handleSearch = async () => {
    if (!searchQuery.value.trim()) {
        // If search is empty, show all sheets
        wineSheets.value = await dataService.getAllSheets();
        return;
    }

    try {
        wineSheets.value = await dataService.searchSheets(searchQuery.value);
    } catch (error) {
        console.error('Error searching wine sheets:', error);
    }
};

const deleteSingleSheet = async (wineSheetId: string) => {
    try {
        const success = await dataService.deleteSheet(wineSheetId);
        if (success) {
            wineSheets.value = wineSheets.value.filter(
                sheet => sheet.id !== wineSheetId
            );
            showDeleteConfirm.value = false;
        } else {
            alert('Failed to delete wine tasting sheet');
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting wine tasting sheet');
    }
};
</script>

<style scoped>
.home-view {
    position: relative;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.action-buttons {
    display: flex;
    gap: 1rem;
}

.empty-state {
    text-align: center;
    padding: 3rem 0;
}

.empty-state h3 {
    margin-bottom: 1rem;
}

.empty-state p {
    margin-bottom: 1.5rem;
    color: #666;
}

.wine-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

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

.view-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
}

.search-container {
    flex: 1;
}

.view-switcher {
    display: flex;
    gap: 0.5rem;
}

.view-switcher .btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.view-switcher .btn i {
    font-size: 0.9rem;
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

    .view-controls {
        flex-direction: column;
    }

    .search-container {
        width: 100%;
    }

    .view-switcher {
        width: 100%;
        justify-content: center;
    }
}
</style>