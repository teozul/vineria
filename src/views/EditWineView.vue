<template>
    <div class="edit-wine-view">
      <div class="page-header">
        <h1>Edit Wine Tasting Sheet</h1>
      </div>
      
      <div v-if="loading" class="loading-indicator">
        <p>Loading wine tasting sheet...</p>
      </div>
      
      <div v-else-if="error" class="error-message">
        <div class="card">
          <h3>Error</h3>
          <p>{{ error }}</p>
          <button @click="goBack" class="btn">Go Back</button>
        </div>
      </div>
      
      <WineForm 
        v-else 
        :initialData="wineSheet" 
        :isEdit="true" 
        @submit="updateWineSheet" 
        @cancel="goBack" 
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import WineForm from '@/components/WineForm.vue';
  import { WineTastingSheet } from '@/models/WineTastingSheet';
  import { dataService } from '@/services/DataService';
  
  const router = useRouter();
  const route = useRoute();
  const id = route.params.id as string;
  
  const wineSheet = ref<WineTastingSheet | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  // Load the wine sheet on component mount
  onMounted(async () => {
    try {
      const sheet = await dataService.getSheetById(id);
      if (sheet) {
        wineSheet.value = sheet;
      } else {
        error.value = 'Wine tasting sheet not found.';
      }
    } catch (e) {
      console.error('Error loading wine sheet:', e);
      error.value = 'There was an error loading the wine tasting sheet.';
    } finally {
      loading.value = false;
    }
  });
  
  // Update the wine tasting sheet
  const updateWineSheet = async (updatedSheet: WineTastingSheet) => {
    try {
      await dataService.updateSheet(updatedSheet);
      router.push({ name: 'detail', params: { id: updatedSheet.id } });
    } catch (e) {
      console.error('Error updating wine sheet:', e);
      alert('There was an error updating the wine tasting sheet. Please try again.');
    }
  };
  
  // Go back to previous page
  const goBack = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  .edit-wine-view {
    padding-bottom: 2rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .loading-indicator, .error-message {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }
  
  .error-message .card {
    max-width: 600px;
    text-align: center;
  }
  
  .error-message h3 {
    color: #721c24;
    margin-bottom: 1rem;
  }
  
  .error-message p {
    margin-bottom: 1.5rem;
  }
  </style>