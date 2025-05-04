<template>
  <form @submit.prevent="handleSubmit" class="wine-form">
    <!-- Basic Wine Information Section -->
    <div class="form-section">
      <h2 class="form-section-title">Basic Information</h2>
      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="location" class="form-label">Location</label>
            <input 
              type="text" 
              id="location" 
              v-model="localWineSheet.location" 
              class="form-control" 
              required
            />
          </div>
        </div>
        
        <div class="form-col">
          <div class="form-group">
            <label for="date" class="form-label">Date</label>
            <input 
              type="date" 
              id="date" 
              v-model="localWineSheet.date" 
              class="form-control" 
              required
            />
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="time" class="form-label">Time</label>
            <input 
              type="time" 
              id="time" 
              v-model="localWineSheet.time" 
              class="form-control" 
              required
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Wine Details Section -->
    <div class="form-section">
      <h2 class="form-section-title">Wine Details</h2>
      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="producer" class="form-label">Producer</label>
            <input 
              type="text" 
              id="producer" 
              v-model="localWineSheet.producer" 
              class="form-control" 
              required
            />
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="denomination" class="form-label">Denomination</label>
            <input 
              type="text" 
              id="denomination" 
              v-model="localWineSheet.denomination" 
              class="form-control" 
              required
            />
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="classification" class="form-label">Classification</label>
            <select 
              id="classification" 
              v-model="localWineSheet.classification" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in wineClassificationOptions" :key="key" :value="value">
                {{ wineClassificationLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="vintage" class="form-label">Vintage</label>
            <input 
              type="number" 
              id="vintage" 
              v-model="localWineSheet.vintage" 
              class="form-control" 
              min="1900" 
              :max="new Date().getFullYear()"  
              required
            />
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="wineType" class="form-label">Wine Type</label>
            <select 
              id="wineType" 
              v-model="localWineSheet.wineType" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in WineType" :key="key" :value="value">
                {{ wineTypeLabels[value] }}
              </option> 
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="alcoholContent" class="form-label">Alcohol Content (%)</label>
            <input 
              type="number" 
              id="alcoholContent" 
              v-model="localWineSheet.alcoholContent" 
              class="form-control" 
              step="0.1" 
              min="0" 
              max="30" 
              required
            />
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="temperature" class="form-label">Temperature (°C)</label>
            <input 
              type="number" 
              id="temperature" 
              v-model="localWineSheet.temperature" 
              class="form-control" 
              step="0.1" 
              min="0" 
              max="30" 
              required
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Examination Section -->
    <div class="form-section">
      <h2 class="form-section-title">Visual Examination</h2>
      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="limpidity" class="form-label">Limpidity</label>
            <select 
              id="limpidity" 
              v-model="localWineSheet.visualExam.limpidity" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in limpidityOptions" :key="key" :value="value">
                {{ limpidityLevelLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="transparency" class="form-label">Transparency</label>
            <select 
              id="transparency" 
              v-model="localWineSheet.visualExam.transparency" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in transparencyOptions" :key="key" :value="value">
                {{ transparencyLevelLabels[value] }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="colorTone" class="form-label">Color Tone</label>
            <select 
              id="colorTone" 
              v-model="localWineSheet.visualExam.color.tone" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in getColorToneOptions()" :key="key" :value="value">
                {{ colorToneLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="colorIntensity" class="form-label">Color Intensity</label>
            <select 
              id="colorIntensity" 
              v-model="localWineSheet.visualExam.color.intensity" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in colorIntensityOptions" :key="key" :value="value">
                {{ colorIntensityLabels[value] }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="fluidity" class="form-label">Fluidity</label>
            <select 
              id="fluidity" 
              v-model="localWineSheet.visualExam.fluidity" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in fluidityOptions" :key="key" :value="value">
                {{ fluidityLevelLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- Effervescence (only for sparkling wines) -->
        <div class="form-col" v-if="isSparklingWine">
          <div class="form-group">
            <label for="effervescenceGrain" class="form-label">Effervescence Grain</label>
            <select 
              id="effervescenceGrain" 
              v-model="effervescenceGrain" 
              class="form-control"
            >
              <option v-for="(value, key) in effervescenceGrainOptions" :key="key" :value="value">
                {{ effervescenceGrainLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col" v-if="isSparklingWine">
          <div class="form-group">
            <label for="effervescencePersistence" class="form-label">Effervescence Persistence</label>
            <select 
              id="effervescencePersistence" 
              v-model="effervescencePersistence" 
              class="form-control"
            >
              <option v-for="(value, key) in effervescencePersistenceOptions" :key="key" :value="value">
                {{ effervescencePersistenceLabels[value] }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <div class="form-check">
          <input 
            type="checkbox" 
            id="isSparklingWine" 
            v-model="isSparklingWine" 
            class="form-check-input"
          />
          <label for="isSparklingWine" class="form-check-label">This is a sparkling wine</label>
        </div>
      </div>
    </div>

    <!-- Olfactory Examination Section -->
    <div class="form-section">
      <h2 class="form-section-title">Olfactory Examination</h2>
      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="olfactoryIntensity" class="form-label">Intensity</label>
            <select 
              id="olfactoryIntensity" 
              v-model="localWineSheet.olfactoryExam.intensity" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in olfactoryIntensityOptions" :key="key" :value="value">
                {{ olfactoryIntensityLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="olfactoryFranchness" class="form-label">Franchness</label>
            <select 
              id="olfactoryFranchness" 
              v-model="localWineSheet.olfactoryExam.quality.franchness" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in olfactoryFranchnessOptions" :key="key" :value="value">
                {{ olfactoryFranchnessLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="olfactoryFineness" class="form-label">Fineness</label>
            <select 
              id="olfactoryFineness" 
              v-model="localWineSheet.olfactoryExam.quality.fineness" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in olfactoryFinenessOptions" :key="key" :value="value">
                {{ olfactoryFinenessLabels[value] }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Aroma Types</label>
        <div class="aroma-options">
          <div
            v-for="(value, key) in aromaTypeOptions"
            :key="key"
            class="form-check"
          >
            <input
              type="checkbox"
              :id="'aroma-' + key"
              :value="value"
              v-model="selectedAromaTypes"
              class="form-check-input"
            />
            <label :for="'aroma-' + key" class="form-check-label">{{ aromaTypeLabels[value] }}</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="olfactoryComplexity" class="form-label">Complexity</label>
        <select 
          id="olfactoryComplexity" 
          v-model="localWineSheet.olfactoryExam.complexity" 
          class="form-control" 
          required
        >
          <option v-for="(value, key) in olfactoryComplexityOptions" :key="key" :value="value">
            {{ olfactoryComplexityLabels[value] }}
          </option>
        </select>
      </div>
    </div>

    <!-- Gustatory Examination Section -->
    <div class="form-section">
      <h2 class="form-section-title">Gustatory Examination</h2>
      
      <h3 class="subsection-title">Body and Structure</h3>
      <div class="form-group">
        <label for="body" class="form-label">Body</label>
        <select 
          id="body" 
          v-model="localWineSheet.gustatoryExam.body" 
          class="form-control" 
          required
        >
          <option v-for="(value, key) in bodyLevelOptions" :key="key" :value="value">
            {{ value }}
          </option>
        </select>
      </div>

      <h3 class="subsection-title">Soft Elements</h3>
      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="alcoholLevel" class="form-label">Alcohol Level</label>
            <select 
              id="alcoholLevel" 
              v-model="localWineSheet.gustatoryExam.softElements.alcoholLevel" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in alcoholLevelOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="softness" class="form-label">Softness</label>
            <select 
              id="softness" 
              v-model="localWineSheet.gustatoryExam.softElements.softness" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in softnessLevelOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="sugars" class="form-label">Sugars</label>
            <select 
              id="sugars" 
              v-model="localWineSheet.gustatoryExam.softElements.sugars" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in sugarLevelOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <h3 class="subsection-title">Hard Elements</h3>
      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="acidity" class="form-label">Acidity</label>
            <select 
              id="acidity" 
              v-model="localWineSheet.gustatoryExam.hardElements.acidity" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in acidityLevelOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="salinity" class="form-label">Salinity</label>
            <select 
              id="salinity" 
              v-model="localWineSheet.gustatoryExam.hardElements.salinity" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in salinityLevelOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="tannins" class="form-label">Tannins</label>
            <select 
              id="tannins" 
              v-model="localWineSheet.gustatoryExam.hardElements.tannins" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in tanninLevelOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="balance" class="form-label">Balance</label>
        <select 
          id="balance" 
          v-model="localWineSheet.gustatoryExam.balance" 
          class="form-control" 
          required
        >
          <option v-for="(value, key) in balanceOptions" :key="key" :value="value">
            {{ value }}
          </option>
        </select>
      </div>

      <h3 class="subsection-title">Retro-Olfactory</h3>
      <div class="form-row">
        <div class="form-col">
          <div class="form-group">
            <label for="retroIntensity" class="form-label">Intensity</label>
            <select 
              id="retroIntensity" 
              v-model="localWineSheet.gustatoryExam.retroOlfactory.intensity" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in olfactoryIntensityOptions" :key="key" :value="value">
                {{ olfactoryIntensityLabels[value] }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="retroQuality" class="form-label">Quality</label>
            <select 
              id="retroQuality" 
              v-model="localWineSheet.gustatoryExam.retroOlfactory.quality" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in retroOlfactoryQualityOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-col">
          <div class="form-group">
            <label for="retroPersistence" class="form-label">Mouth Aroma Persistence</label>
            <select 
              id="retroPersistence" 
              v-model="localWineSheet.gustatoryExam.retroOlfactory.mouthAroma.persistence" 
              class="form-control" 
              required
            >
              <option v-for="(value, key) in retroOlfactoryPersistenceOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Evolutionary State and Final Considerations -->
    <div class="form-section">
      <h2 class="form-section-title">{{Labels.finalEvaluation}}</h2>
      <div class="form-group">
        <label for="evolutionaryState" class="form-label">{{ Labels.evolutionaryState }}</label>
        <select 
          id="evolutionaryState" 
          v-model="localWineSheet.evolutionaryState" 
          class="form-control" 
          required
        >
          <option v-for="(value, key) in evolutionaryStateOptions" :key="key" :value="value">
            {{ evolutionaryStateLabels[value] }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="finalConsiderations" class="form-label">{{ Labels.finalConsiderations }}</label>
        <textarea 
          id="finalConsiderations" 
          v-model="localWineSheet.finalConsiderations" 
          class="form-control" 
          rows="4"
        ></textarea>
      </div>
    </div>

    <div class="form-actions"> 
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      <button type="submit" class="btn" :disabled="submitting">
        {{ submitButtonText }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import WineFormComponent from './WineForm';
export default WineFormComponent;
</script>