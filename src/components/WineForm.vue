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
              <option value="">Select Classification</option>
              <option value="IGT">IGT</option>
              <option value="DOC">DOC</option>
              <option value="DOCG">DOCG</option>
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
              <option value="Rosso">Rosso</option>
              <option value="Bianco">Bianco</option>
              <option value="Rosé">Rosé</option>
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
                {{ value }}
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
            <label :for="'aroma-' + key" class="form-check-label">{{ value }}</label>
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
            {{ value }}
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
                {{ value }}
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
      <h2 class="form-section-title">Final Evaluation</h2>
      <div class="form-group">
        <label for="evolutionaryState" class="form-label">Evolutionary State</label>
        <select 
          id="evolutionaryState" 
          v-model="localWineSheet.evolutionaryState" 
          class="form-control" 
          required
        >
          <option v-for="(value, key) in evolutionaryStateOptions" :key="key" :value="value">
            {{ value }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="finalConsiderations" class="form-label">Final Considerations</label>
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
import { ref, reactive, computed, watch, onMounted, defineComponent, PropType } from 'vue';
import { 
  WineTastingSheet, createEmptyWineTastingSheet, 
  LimpidityLevel, TransparencyLevel, ColorTone, ColorIntensity, FluidityLevel,
  EffervescenceGrain, EffervescencePersistence, OlfactoryIntensity, 
  OlfactoryFranchness, OlfactoryFineness, AromaType, OlfactoryComplexity,
  BodyLevel, AlcoholLevel, SoftnessLevel, SugarLevel, AcidityLevel,
  SalinityLevel, TanninLevel, Balance, RetroOlfactoryQuality, 
  RetroOlfactoryPersistence, EvolutionaryState
} from '@/models/WineTastingSheet';

export default defineComponent({
  name: 'WineForm',
  props: {
    wineSheet: {
      type: Object as PropType<WineTastingSheet>,
      default: () => createEmptyWineTastingSheet()
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    // State
    const submitting = ref<boolean>(false);
    const isSparklingWine = ref<boolean>(false);
    
    // Create a deep copy of the wineSheet prop to avoid mutating it directly
    const localWineSheet = reactive<WineTastingSheet>(JSON.parse(JSON.stringify(props.wineSheet)));

    // Computed properties
    const submitButtonText = computed((): string => 
      submitting.value 
        ? 'Saving...' 
        : props.isEdit 
          ? 'Update Wine Tasting Sheet' 
          : 'Save Wine Tasting Sheet'
    );

    // Handle effervescence properties separately
    const effervescenceGrain = ref<string>(
      localWineSheet.visualExam.effervescence?.grain || EffervescenceGrain.Fine
    );

    const effervescencePersistence = ref<string>(
      localWineSheet.visualExam.effervescence?.persistence || EffervescencePersistence.Persistent
    );

    // Handle aroma types as a separate array for checkboxes
    const selectedAromaTypes = ref<string[]>(
      [...(localWineSheet.olfactoryExam.aromaTypes || [])]
    );

    // Watch for changes in sparklingWine checkbox
    watch(isSparklingWine, (newValue: boolean): void => {
      if (newValue) {
        localWineSheet.visualExam.effervescence = {
          grain: effervescenceGrain.value,
          persistence: effervescencePersistence.value
        };
      } else {
        localWineSheet.visualExam.effervescence = undefined;
      }
    });

    // Watch for changes in effervescence properties
    watch([effervescenceGrain, effervescencePersistence], ([newGrain, newPersistence]) => {
      if (isSparklingWine.value) {
        localWineSheet.visualExam.effervescence = {
          grain: newGrain,
          persistence: newPersistence
        };
      }
    });

    // Watch for changes in selected aroma types
    watch(selectedAromaTypes, (newAromaTypes: string[]): void => {
      localWineSheet.olfactoryExam.aromaTypes = [...newAromaTypes];
    });

    // Initialize values on component mount
    onMounted((): void => {
      isSparklingWine.value = !!localWineSheet.visualExam.effervescence;
      
      // Adjust color tone options based on wine type
      if (localWineSheet.wineType === 'Bianco' && !isWhiteWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.StrawYellow;
      } else if (localWineSheet.wineType === 'Rosé' && !isRoseWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.CherryPink;
      } else if (localWineSheet.wineType === 'Rosso' && !isRedWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.RubyRed;
      }
    });

    // Color tone filtering helpers
    const isWhiteWineColorTone = (tone: string): boolean => {
      return [
        ColorTone.GreenishYellow,
        ColorTone.StrawYellow,
        ColorTone.GoldenYellow,
        ColorTone.AmberYellow
      ].includes(tone);
    };

    const isRoseWineColorTone = (tone: string): boolean => {
      return [
        ColorTone.LightPink,
        ColorTone.CherryPink,
        ColorTone.ClaretPink
      ].includes(tone);
    };

    const isRedWineColorTone = (tone: string): boolean => {
      return [
        ColorTone.PurpleRed,
        ColorTone.RubyRed,
        ColorTone.GranatRed,
        ColorTone.OrangeRed
      ].includes(tone);
    };

    // Watch for changes in wine type to update color tone options
    watch(() => localWineSheet.wineType, (newWineType: string): void => {
      if (newWineType === 'Bianco' && !isWhiteWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.StrawYellow;
      } else if (newWineType === 'Rosé' && !isRoseWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.CherryPink;
      } else if (newWineType === 'Rosso' && !isRedWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.RubyRed;
      }
    });

    // Get color tone options based on wine type
    const getColorToneOptions = () => {
      if (localWineSheet.wineType === 'Bianco') {
        return {
          GreenishYellow: ColorTone.GreenishYellow,
          StrawYellow: ColorTone.StrawYellow,
          GoldenYellow: ColorTone.GoldenYellow,
          AmberYellow: ColorTone.AmberYellow
        };
      } else if (localWineSheet.wineType === 'Rosé') {
        return {
          LightPink: ColorTone.LightPink,
          CherryPink: ColorTone.CherryPink,
          ClaretPink: ColorTone.ClaretPink
        };
      } else {
        return {
          PurpleRed: ColorTone.PurpleRed,
          RubyRed: ColorTone.RubyRed,
          GranatRed: ColorTone.GranatRed,
          OrangeRed: ColorTone.OrangeRed
        };
      }
    };

    // Form submission handling
    const handleSubmit = async (): Promise<void> => {
      submitting.value = true;
      
      try {
        // Update the aroma types from the selected checkboxes
        localWineSheet.olfactoryExam.aromaTypes = [...selectedAromaTypes.value];
        
        // Update effervescence if it's a sparkling wine
        if (isSparklingWine.value) {
          localWineSheet.visualExam.effervescence = {
            grain: effervescenceGrain.value,
            persistence: effervescencePersistence.value
          };
        } else {
          localWineSheet.visualExam.effervescence = undefined;
        }
        
        // Emit the save event with the wine sheet data
        emit('save', JSON.parse(JSON.stringify(localWineSheet)));
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error saving the wine tasting sheet. Please try again.');
      } finally {
        submitting.value = false;
      }
    };

    // Cancel button handler
    const cancel = (): void => {
      emit('cancel');
    };

    // Options for all enum-based fields
    const limpidityOptions = Object.values(LimpidityLevel);
    const transparencyOptions = Object.values(TransparencyLevel);
    const colorIntensityOptions = Object.values(ColorIntensity);
    const fluidityOptions = Object.values(FluidityLevel);
    const effervescenceGrainOptions = Object.values(EffervescenceGrain);
    const effervescencePersistenceOptions = Object.values(EffervescencePersistence);
    const olfactoryIntensityOptions = Object.values(OlfactoryIntensity);
    const olfactoryFranchnessOptions = Object.values(OlfactoryFranchness);
    const olfactoryFinenessOptions = Object.values(OlfactoryFineness);
    const aromaTypeOptions = Object.values(AromaType);
    const olfactoryComplexityOptions = Object.values(OlfactoryComplexity);
    const bodyLevelOptions = Object.values(BodyLevel);
    const alcoholLevelOptions = Object.values(AlcoholLevel);
    const softnessLevelOptions = Object.values(SoftnessLevel);
    const sugarLevelOptions = Object.values(SugarLevel);
    const acidityLevelOptions = Object.values(AcidityLevel);
    const salinityLevelOptions = Object.values(SalinityLevel);
    const tanninLevelOptions = Object.values(TanninLevel);
    const balanceOptions = Object.values(Balance);
    const retroOlfactoryQualityOptions = Object.values(RetroOlfactoryQuality);
    const retroOlfactoryPersistenceOptions = Object.values(RetroOlfactoryPersistence);
    const evolutionaryStateOptions = Object.values(EvolutionaryState);

    return {
      localWineSheet,
      submitting,
      isSparklingWine,
      effervescenceGrain,
      effervescencePersistence,
      selectedAromaTypes,
      submitButtonText,
      handleSubmit,
      cancel,
      getColorToneOptions,
      // Options
      limpidityOptions,
      transparencyOptions,
      colorIntensityOptions,
      fluidityOptions,
      effervescenceGrainOptions,
      effervescencePersistenceOptions,
      olfactoryIntensityOptions,
      olfactoryFranchnessOptions,
      olfactoryFinenessOptions,
      aromaTypeOptions,
      olfactoryComplexityOptions,
      bodyLevelOptions,
      alcoholLevelOptions,
      softnessLevelOptions,
      sugarLevelOptions,
      acidityLevelOptions,
      salinityLevelOptions,
      tanninLevelOptions,
      balanceOptions,
      retroOlfactoryQualityOptions,
      retroOlfactoryPersistenceOptions,
      evolutionaryStateOptions
    };
  }
});
</script>