<template>
    <div class="wine-details-component">
      <div v-if="!wineSheet" class="no-data">
        <p>No wine tasting sheet data available.</p>
      </div>
      
      <div v-else class="wine-details">
        <div class="wine-badge" :class="getWineTypeClass(wineSheet.wineType)">
          {{ wineSheet.wineType }}
        </div>
        
        <!-- Basic Information Section -->
        <section class="detail-section">
          <h2 class="section-title">Basic Information</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Denomination</span>
              <span class="detail-value">{{ wineSheet.denomination }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Producer</span>
              <span class="detail-value">{{ wineSheet.producer }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Classification</span>
              <span class="detail-value">{{ wineSheet.classification }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Vintage</span>
              <span class="detail-value">{{ wineSheet.vintage }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Alcohol Content</span>
              <span class="detail-value">{{ wineSheet.alcoholContent }}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Serving Temperature</span>
              <span class="detail-value">{{ wineSheet.temperature }}°C</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Tasting Location</span>
              <span class="detail-value">{{ wineSheet.location }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Tasted On</span>
              <span class="detail-value">{{ formatDate(wineSheet.date) }} at {{ wineSheet.time }}</span>
            </div>
          </div>
        </section>
        
        <!-- Visual Examination Section -->
        <section class="detail-section">
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
            <div v-if="wineSheet.visualExam.effervescence" class="detail-item">
              <span class="detail-label">Effervescence</span>
              <span class="detail-value">
                {{ wineSheet.visualExam.effervescence.grain }}, 
                {{ wineSheet.visualExam.effervescence.persistence }}
              </span>
            </div>
          </div>
        </section>
        
        <!-- Olfactory Examination Section -->
        <section class="detail-section">
          <h2 class="section-title">Olfactory Examination</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Intensity</span>
              <span class="detail-value">{{ wineSheet.olfactoryExam.intensity }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Quality</span>
              <span class="detail-value">
                Franchness: {{ wineSheet.olfactoryExam.quality.franchness }}, 
                Fineness: {{ wineSheet.olfactoryExam.quality.fineness }}
              </span>
            </div>
            <div class="detail-item full-width">
              <span class="detail-label">Aroma Types</span>
              <span class="detail-value">
                <div class="tag-list">
                  <span v-for="(aroma, index) in wineSheet.olfactoryExam.aromaTypes" :key="index" class="tag">
                    {{ aroma }}
                  </span>
                </div>
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Complexity</span>
              <span class="detail-value">{{ wineSheet.olfactoryExam.complexity }}</span>
            </div>
          </div>
        </section>
        
        <!-- Gustatory Examination Section -->
        <section class="detail-section">
          <h2 class="section-title">Gustatory Examination</h2>
          
          <h3 class="subsection-title">Structure and Balance</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Body</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.body }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Balance</span>
              <span class="detail-value">{{ wineSheet.gustatoryExam.balance }}</span>
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
        </section>
        
        <!-- Final Evaluation Section -->
        <section class="detail-section">
          <h2 class="section-title">Final Evaluation</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Evolutionary State</span>
              <span class="detail-value">{{ wineSheet.evolutionaryState }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="detail-label">Final Considerations</span>
              <span class="detail-value consideration-text">
                {{ wineSheet.finalConsiderations || 'No final considerations provided.' }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { WineTastingSheet } from '@/models/WineTastingSheet';
  
  // Props
  interface Props {
    wineSheet: WineTastingSheet | null;
  }
  
  const props = defineProps<Props>();
  
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
        return 'wine-badge-red';
      case 'Bianco':
        return 'wine-badge-white';
      case 'Rosé':
        return 'wine-badge-rose';
      default:
        return '';
    }
  };
  </script>
  
  <style scoped>
  .wine-details-component {
    width: 100%;
  }
  
  .no-data {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .wine-details {
    position: relative;
    padding-top: 1rem;
  }
  
  .wine-badge {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .wine-badge-red {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .wine-badge-white {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .wine-badge-rose {
    background-color: #f5c2c7;
    color: #58151c;
  }
  
  .detail-section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
    color: #4a6da7;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
  
  .subsection-title {
    font-size: 1.1rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #555;
    font-weight: 500;
  }
  
  .detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem 2rem;
  }
  
  .detail-item {
    display: flex;
    flex-direction: column;
  }
  
  .full-width {
    grid-column: 1 / -1;
  }
  
  .detail-label {
    font-weight: 500;
    color: #555;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }
  
  .detail-value {
    color: #333;
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background-color: #e9ecef;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }
  
  .consideration-text {
    font-style: italic;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .detail-grid {
      grid-template-columns: 1fr;
    }
  }
  </style> 