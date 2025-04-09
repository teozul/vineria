<template>
    <div class="wine-list-component">
      <div v-if="loading" class="loading-state">
        <p>Loading wine tasting sheets...</p>
      </div>
  
      <div v-else-if="sheets.length === 0" class="empty-state">
        <p>No wine tasting sheets available.</p>
        <slot name="empty-action"></slot>
      </div>
  
      <div v-else class="wine-sheets-grid">
        <div v-for="sheet in sheets" :key="sheet.id" class="wine-card card">
          <div class="wine-card-header">
            <h3>{{ sheet.denomination }}</h3>
            <span class="wine-type" :class="getWineTypeClass(sheet.wineType)">
              {{ sheet.wineType }}
            </span>
          </div>
          <div class="wine-card-details">
            <p><strong>Producer:</strong> {{ sheet.producer }}</p>
            <p><strong>Vintage:</strong> {{ sheet.vintage }}</p>
            <p><strong>Classification:</strong> {{ sheet.classification }}</p>
            <p><strong>Tasted on:</strong> {{ formatDate(sheet.date) }}</p>
          </div>
          <div class="wine-card-actions">
            <slot name="item-actions" :sheet="sheet"></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { WineTastingSheet } from '@/models/WineTastingSheet';
  
  // Props
  interface Props {
    sheets: WineTastingSheet[];
    loading?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    sheets: () => [],
    loading: false
  });
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };
  
  // Get CSS class based on wine type
  const getWineTypeClass = (wineType: string): string => {
    switch (wineType) {
      case 'Rosso':
        return 'wine-type-red';
      case 'Bianco':
        return 'wine-type-white';
      case 'Rosé':
        return 'wine-type-rose';
      default:
        return '';
    }
  };
  </script>
  
  <style scoped>
  .wine-list-component {
    width: 100%;
  }
  
  .loading-state, .empty-state {
    text-align: center;
    padding: 2rem 0;
    color: #666;
  }
  
  .wine-sheets-grid {
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
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .wine-type-white {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .wine-type-rose {
    background-color: #f5c2c7;
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
  
  @media (max-width: 768px) {
    .wine-sheets-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>