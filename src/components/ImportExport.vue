<template>
    <div class="import-export-component">
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Import / Export Data</h2>
            <button class="modal-close" @click="$emit('close')">&times;</button>
          </div>
          <div class="modal-body">
            <div class="import-section">
              <h3>Import Data</h3>
              <p class="warning-text">
                Warning: Importing data will replace all existing wine tasting sheets!
              </p>
              <div class="file-input-container">
                <input
                  type="file"
                  id="import-file"
                  accept=".json"
                  @change="handleFileSelected"
                  ref="fileInput"
                />
                <label for="import-file" class="btn">Select JSON File</label>
              </div>
              <p v-if="selectedFile">Selected: {{ selectedFile.name }}</p>
              <button
                v-if="selectedFile"
                @click="importData"
                class="btn"
                :disabled="importing"
              >
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
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { dataService } from '@/services/DataService';
  
  // Emits
  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'import-complete'): void;
  }>();
  
  // State
  const selectedFile = ref<File | null>(null);
  const importing = ref(false);
  const exporting = ref(false);
  const fileInput = ref<HTMLInputElement | null>(null);
  
  // Handle file selection for import
  const handleFileSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedFile.value = input.files[0];
    } else {
      selectedFile.value = null;
    }
  };
  
  // Import data from JSON file
  const importData = async () => {
    if (!selectedFile.value) return;
    
    importing.value = true;
    try {
      const success = await dataService.handleFileUpload(selectedFile.value);
      if (success) {
        resetFileInput();
        emit('import-complete');
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
  };
  
  // Export data to JSON file
  const exportData = async () => {
    exporting.value = true;
    try {
      await dataService.downloadJsonFile();
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting data');
    } finally {
      exporting.value = false;
    }
  };
  
  // Reset file input
  const resetFileInput = () => {
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  };
  </script>
  
  <style scoped>
  .import-export-component {
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
  
  .import-section, .export-section {
    margin-bottom: 2rem;
  }
  
  .import-section h3, .export-section h3 {
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
  
  .file-input-container label {
    display: inline-block;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .modal-content {
      width: 95%;
    }
  }
  </style>