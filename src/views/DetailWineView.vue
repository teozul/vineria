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

    <div v-else class="wine-details">
      <div class="detail-header">
        <h1>{{ wineSheet?.denomination }}</h1>
        <div class="detail-actions">
          <router-link :to="`/edit/${wineSheet?.id}`" class="btn">
            Edit
          </router-link>
          <button @click="goBack" class="btn btn-secondary">
            Back
          </button>
        </div>
      </div>

      <WineDetails :wine-sheet="wineSheet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { WineTastingSheet } from '@/models/WineTastingSheet';
import { dataService } from '@/services/DataService';
import WineDetails from '@/components/WineDetails.vue';

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

// Go back to previous page
const goBack = () => {
  router.push({ name: 'home' });
};
</script>

<style scoped>
.detail-wine-view {
  padding-bottom: 2rem;
}

.loading-indicator,
.error-message {
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
}
</style>