<template>
  <div class="action-buttons">
    <button class="btn" @click="openImportExport">
      {{ Labels.importExportData }}
    </button>
  </div>
  <!-- Import/Export Modal -->
  <div v-if="showImportExport" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2> {{ Labels.importExportData }}</h2>
        <button class="modal-close" @click="showImportExport = false">&times;</button>
      </div>
      <div class="modal-body">
        <div class="import-section">
          <h3>{{ Labels.importData }}</h3>
          <p class="warning-text">
            {{ Labels.importDataWarning }} 
          </p>
          <div class="file-input-container">
            <input type="file" id="import-file" accept=".json" @change="handleFileSelected" ref="fileInput" />
            <label for="import-file" class="btn btn-import-export">{{ Labels.selectJSONFile }}</label>
          </div>
          <p v-if="selectedFile">Selected: {{ selectedFile.name }}</p>
          <button v-if="selectedFile" @click="importData" class="btn btn-import-export" :disabled="importing">
            {{ importing ? Labels.importing : Labels.importData }}
          </button>
        </div>

        <div class="export-section">
          <h3>{{ Labels.exportData }}</h3>
          <p>{{ Labels.exportDataDescription }}</p>
          <button @click="exportData" class="btn btn-import-export" :disabled="exporting">
            {{ exporting ? Labels.exporting : Labels.exportData }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { dataService } from '../services/DataService';
import { Labels } from '../helpers/Labels';
// State variables
const showImportExport = ref(false);
const selectedFile = ref<File | null>(null);
const importing = ref(false);
const exporting = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

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
  if (!selectedFile.value)
    return;

  importing.value = true;
  try {
    const success = await dataService.handleFileUpload(selectedFile.value);
    if (success) {
      showImportExport.value = false;
      selectedFile.value = null;
      if (fileInput.value) {
        fileInput.value.value = '';
      }
      window.location.reload();
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

</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 1rem;
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

.btn {
  min-width: 160px;
  text-align: center;
}

.btn-import-export {
  min-width: 190px;
  text-align: center;
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