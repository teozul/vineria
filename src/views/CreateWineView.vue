<template>
    <div class="create-wine-view">
      <div class="page-header">
        <h1>New Wine Tasting Sheet</h1>
      </div>
      
      <WineForm @submit="saveWineSheet" @cancel="goBack" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import WineForm from '@/components/WineForm.vue';
  import { WineTastingSheet } from '@/models/WineTastingSheet';
  import { dataService } from '@/services/DataService';
  
  const router = useRouter();
  
  // Save a new wine tasting sheet
  const saveWineSheet = async (wineSheet: WineTastingSheet) => {
    try {
      await dataService.createSheet(wineSheet);
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Error saving wine sheet:', error);
      alert('There was an error saving the wine tasting sheet. Please try again.');
    }
  };
  
  // Go back to previous page
  const goBack = () => {
    router.push({ name: 'home' });
  };
  </script>
  
  <style scoped>
  .create-wine-view {
    padding-bottom: 2rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  </style>