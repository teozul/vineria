<template>
  <div class="home-view">
    <div class="page-header">
      <h1>{{ Labels.wineTastingSheets }}</h1>
      <ImportExportView />
    </div>
  </div>
  <ShowWineCardsView />


</template>

<script setup lang="ts">
import ShowWineCardsView from './ShowWineCardsView.vue';
import ImportExportView from './ImportExportView.vue';
import { Labels } from '../helpers/Labels';
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
</style>