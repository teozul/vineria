<template>
    <div class="detail-wine-view">
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
      
      <div v-else-if="wineSheet" class="wine-details">
        <div class="detail-header">
          <h1>{{ wineSheet.denomination }}</h1>
          <div class="detail-actions">
            <router-link :to="`/edit/${wineSheet.id}`" class="btn">
              Edit
            </router-link>
            <button @click="goBack" class="btn btn-secondary">
              Back
            </button>
          </div>
        </div>
        
        <div class="card wine-summary">
          <div class="wine-badge" :class="getWineTypeClass(wineSheet.wineType)">
            {{ wineSheet.wineType }}
          </div>
          <div class="wine-summary-details">
            <div class="summary-row">
              <div class="summary-item">
                <span class="summary-label">Producer</span>
                <span class="summary-value">{{ wineSheet.producer }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Vintage</span>
                <span class="summary-value">{{ wineSheet.vintage }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Classification</span>
                <span class="summary-value">{{ wineSheet.classification }}</span>
              </div>
            </div>
            <div class="summary-row">
              <div class="summary-item">
                <span class="summary-label">Alcohol Content</span>
                <span class="summary-value">{{ wineSheet.alcoholContent }}%</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Serving Temperature</span>
                <span class="summary-value">{{ wineSheet.temperature }}°C</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Tasted On</span>
                <span class="summary-value">{{ formatDate(wineSheet.date) }} at {{ wineSheet.time }}</span>
              </div>
            </div>
            <div class="summary-row">
              <div class="summary-item">
                <span class="summary-label">Location</span>
                <span class="summary-value">{{ wineSheet.location }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Evolutionary State</span>
                <span class="summary-value">{{ wineSheet.evolutionaryState }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Visual Examination Section -->
        <div class="detail-section card">
          <h2 class="section-title">Visual Examination</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Limpidity</span>
              <span class="detail-value">{{ wineSheet.visualExam.limpidity }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Transparency</span>
              <span class="detail-value">{{ wineSheet.visualExam.transparency }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Color</span>
              <span class="detail-value">{{ wineSheet.visualExam.color.tone }} ({{ wineSheet.visualExam.color.intensity }})</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Fluidity</span>
              <span class="detail-value">{{ wineSheet.visualExam.fluidity }}</span>
            </div>
            <template v-if="wineSheet.visualExam.effervescence">
              <div class="detail-item">
                <span class="detail-label">Effervescence Grain</span>
                <span class="detail-value">{{ wineSheet.visualExam.effervescence.grain }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Effervescence Persistence</span>
                <span class="detail-value">{{ wineSheet.visualExam.effervescence.persistence }}</span>
              </div>
            </template>
          </div>
        </div>
        
        <!-- Olfactory Examination Section -->
        <div class="detail-section card">
          <h2 class="section-title">Olfactory Examination</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Intensity</span>
              <span class="detail-value">{{ wineSheet.olfactoryExam.intensity }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Franchness</span>
              <span class="detail-value">{{ wineSheet.olfactoryExam.quality.franchness }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Fineness</span>
              <span class="detail-value">{{ wineSheet.olfactoryExam.quality.fineness }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Complexity</span>
              <span class="detail-value">{{ wineSheet.olfactoryExam.complexity }}</span>
            </div>
          </div>
          
          <div class="aromas-section">
            <h3 class="subsection-title">Aroma Types</h3>
            <div class="aroma-tags">
              <span 
                v-for="(aroma, index) in wineSheet.olfactoryExam.aromaTypes" 
                :key="index" 
                class="aroma-tag"
              >
                {{ aroma }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Gustatory Examination Section -->
        <div class="detail-section card">
          <h2 class="section-title">Gustatory Examination</h2>
          
          <h3 class="subsection-title">Body and Structure</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Body</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.body }}</span>
            </div>
          </div>
          
          <h3 class="subsection-title">Soft Elements</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Alcohol Level</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.softElements.alcoholLevel }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Softness</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.softElements.softness }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Sugars</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.softElements.sugars }}</span>
            </div>
          </div>
          
          <h3 class="subsection-title">Hard Elements</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Acidity</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.hardElements.acidity }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Salinity</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.hardElements.salinity }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Tannins</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.hardElements.tannins }}</span>
            </div>
          </div>
          
          <h3 class="subsection-title">Balance</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Balance</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.balance }}</span>
            </div>
          </div>
          
          <h3 class="subsection-title">Retro-Olfactory</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Intensity</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.retroOlfactory.intensity }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Quality</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.retroOlfactory.quality }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Mouth Aroma Persistence</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.retroOlfactory.mouthAroma.persistence }}</span>
            </div>
          </div>
        </div>
        
        <!-- Final Considerations Section -->
        <div class="detail-section card">
          <h2 class="section-title">Final Considerations</h2>
          <div class="final-considerations">
            <p v-if="wineSheet.finalConsiderations">{{ wineSheet.finalConsiderations }}</p>
            <p v-else class="no-content">No final considerations provided.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
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
  
  // Go back to previous page
  const goBack = () => {
    router.push({ name: 'home' });
  };
  </script>
  
  <style scoped>
  .detail-wine-view {
    padding-bottom: 2rem;
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
  
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .detail-actions {
    display: flex;
    gap: 1rem;
  }
  
  .wine-details {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .wine-summary {
    position: relative;
    margin-bottom: 2rem;
    padding-top: 2.5rem;
  }
  
  .wine-badge {
    position: absolute;
    top: -1rem;
    left: 1.5rem;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  
  .wine-summary-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .summary-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .summary-item {
    flex: 1;
    min-width: 200px;
  }
  
  .summary-label {
    display: block;
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 0.25rem;
  }
  
  .summary-value {
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .detail-section {
    margin-bottom: 2rem;
  }
  
  .section-title {
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    color: #4a6da7;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .subsection-title {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #555;
  }
  
  .detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .detail-item {
    display: flex;
    flex-direction: column;
  }
  
  .detail-label {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 0.25rem;
  }
  
  .detail-value {
    font-weight: 500;
  }
  
  .aromas-section {
    margin-top: 1.5rem;
  }
  
  .aroma-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .aroma-tag {
    padding: 0.4rem 1rem;
    background-color: #e9ecef;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .final-considerations {
    line-height: 1.6;
  }
  
  .no-content {
    color: #6c757d;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    .detail-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .detail-actions {
      margin-top: 1rem;
      width: 100%;
    }
    
    .detail-actions .btn {
      flex: 1;
    }
    
    .summary-row {
      flex-direction: column;
      gap: 1rem;
    }
    
    .detail-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
  </style>