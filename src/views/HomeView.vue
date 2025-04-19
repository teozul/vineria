<template>
  <div class="home-view">
    <div class="page-header">
      <h1>Wine Tasting Sheets</h1>
      <div class="action-buttons">
        <button class="btn btn-sm" @click="openImportExport">
          Import/Export
        </button>
        <router-link to="/create" class="btn">New Tasting Sheet</router-link>
      </div>
    </div>

    <div v-if="loading" class="loading-indicator">
      <p>Loading wine tasting sheets...</p>
    </div>

    <div v-else-if="wineSheets.length === 0" class="empty-state">
      <div class="card">
        <h3>No Wine Tasting Sheets Yet</h3>
        <p>Start by creating your first wine tasting sheet!</p>
        <router-link to="/create" class="btn">Create New</router-link>
      </div>
    </div>

    <div v-else class="wine-list">
      <div v-for="sheet in wineSheets" :key="sheet.id" class="wine-card card">
        <div class="wine-card-header">
          <h3>{{ sheet.denomination }}</h3>
          <span class="wine-type" :class="getWineTypeClass(sheet.wineType)">
            {{ wineTypeLabels[sheet.wineType] }}
          </span>
        </div>
        <div class="wine-card-details">
          <p><strong>Producer:</strong> {{ sheet.producer }}</p>
          <p><strong>Vintage:</strong> {{ sheet.vintage }}</p>
          <p><strong>Classification:</strong> {{
            wineClassificationLabels[sheet.classification]
          }}</p>
          <p><strong>Tasted on:</strong> {{ formatDate(sheet.date) }}</p>
        </div>
        <div class="wine-card-actions">
          <router-link :to="`/detail/${sheet.id}`" class="btn btn-sm">
            View Details
          </router-link>
          <router-link :to="`/edit/${sheet.id}`" class="btn btn-sm btn-secondary">
            Edit
          </router-link>
          <button @click="confirmDelete(sheet)" class="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Import/Export Modal -->
    <div v-if="showImportExport" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Import / Export Data</h2>
          <button class="modal-close" @click="showImportExport = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="import-section">
            <h3>Import Data</h3>
            <p class="warning-text">
              Warning: Importing data will replace all existing wine tasting sheets!
            </p>
            <div class="file-input-container">
              <input type="file" id="import-file" accept=".json" @change="handleFileSelected" ref="fileInput" />
              <label for="import-file" class="btn">Select JSON File</label>
            </div>
            <p v-if="selectedFile">Selected: {{ selectedFile.name }}</p>
            <button v-if="selectedFile" @click="importData" class="btn" :disabled="importing">
              {{ importing ? 'Importing...' : 'Import Data' }}
            </button>
          </div>

          <div class="export-section">
            <h3>Export Data</h3>
            <p>Download all your wine tasting sheets as a JSON file.</p>
            <button @click="exportData" class="btn" :disabled="exporting">
              {{ exporting ? 'Exporting...' : 'Export Data' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteConfirm" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Confirm Deletion</h2>
        <button class="modal-close" @click="cancelDelete">&times;</button>
      </div>
      <div class="modal-body">
        <p>
          Are you sure you want to delete the tasting sheet for
          <strong>{{ sheetToDelete?.denomination }}</strong> by
          <strong>{{ sheetToDelete?.producer }}</strong>?
        </p>
        <p class="warning-text">This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="deleteSheet" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--<WineCard :wine-sheet="wineSheets[0]" @delete="deleteSingleSheet" />-->

</template>

<script setup lang="ts">
import WineCard from '@/components/WineCard.vue'
import { ref, onMounted } from 'vue';
import { WineTastingSheet, wineClassificationLabels, wineTypeLabels } from '../models/WineTastingSheet';
import { dataService } from '../services/DataService';
import { getWineTypeClass } from '@/helpers/WineUtils';
import { formatDate } from '@/helpers/DateUtils';
// State variables
const wineSheets = ref<WineTastingSheet[]>([]);
const loading = ref(true);
const showImportExport = ref(false);
const showDeleteConfirm = ref(false);
const sheetToDelete = ref<WineTastingSheet | null>(null);
const selectedFile = ref<File | null>(null);
const importing = ref(false);
const exporting = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Load wine sheets on component mount
onMounted(async () => {
  try {
    wineSheets.value = await dataService.getAllSheets();
  } catch (error) {
    console.error('Error loading wine sheets:', error);
  } finally {
    loading.value = false;
  }
});

// Open import/export modal
function openImportExport() {
  showImportExport.value = true;
}

// Handle file selection for import
function handleFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
  } else {
    selectedFile.value = null;
  }
}

// Import data from JSON file
async function importData() {
  if (!selectedFile.value) return;

  importing.value = true;
  try {
    const success = await dataService.handleFileUpload(selectedFile.value);
    if (success) {
      wineSheets.value = await dataService.getAllSheets();
      showImportExport.value = false;
      selectedFile.value = null;
      if (fileInput.value) {
        fileInput.value.value = '';
      }
      alert('Data imported successfully!');
    } else {
      alert('Failed to import data. Please check the file format.');
    }
  } catch (error) {
    console.error('Import error:', error);
    alert('Error importing data: ' + (error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    importing.value = false;
  }
}

// Export data to JSON file
async function exportData() {
  exporting.value = true;
  try {
    dataService.downloadJsonFile();
  } catch (error) {
    console.error('Export error:', error);
    alert('Error exporting data');
  } finally {
    exporting.value = false;
    showImportExport.value = false;
  }
}
// Confirm sheet deletion
const confirmDelete = (sheet: WineTastingSheet) => {
  sheetToDelete.value = sheet;
  showDeleteConfirm.value = true;
};

// Cancel deletion
const cancelDelete = () => {
  sheetToDelete.value = null;
  showDeleteConfirm.value = false;
};


// Delete the sheet
async function deleteSheet() {
  if (!sheetToDelete.value) return;

  try {
    const success = await dataService.deleteSheet(sheetToDelete.value.id);
    if (success) {
      wineSheets.value = wineSheets.value.filter(
        sheet => sheet.id !== sheetToDelete.value?.id
      );
      showDeleteConfirm.value = false;
      sheetToDelete.value = null;
    } else {
      alert('Failed to delete wine tasting sheet');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting wine tasting sheet');
  }
}

// Delete the sheet
const deleteSingleSheet = async (wineSheetId: string) => {
  try {
    const success = await dataService.deleteSheet(wineSheetId);
    if (success) {
      wineSheets.value = wineSheets.value.filter(
        sheet => sheet.id !== sheetToDelete.value?.id
      );
      showDeleteConfirm.value = false;
      sheetToDelete.value = null;
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