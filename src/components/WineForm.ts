import { ref, reactive, computed, watch, onMounted, defineComponent, PropType } from 'vue';
import { 
  WineTastingSheet, createEmptyWineTastingSheet, 
  LimpidityLevel, TransparencyLevel, ColorTone, ColorIntensity, FluidityLevel,
  EffervescenceGrain, EffervescencePersistence, OlfactoryIntensity, 
  OlfactoryFranchness, OlfactoryFineness, AromaType, OlfactoryComplexity,
  BodyLevel, AlcoholLevel, SoftnessLevel, SugarLevel, AcidityLevel,
  SalinityLevel, TanninLevel, Balance, RetroOlfactoryQuality, 
  RetroOlfactoryPersistence, EvolutionaryState, WineClassification,
  wineClassificationLabels, WineType, wineTypeLabels
} from '@/models/WineTastingSheet';
 
export default defineComponent({
  name: 'WineForm',
  props: {
    wineSheet: {
      type: Object as PropType<WineTastingSheet | null>,
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
    const effervescenceGrain = ref<EffervescenceGrain>(
      localWineSheet.visualExam.effervescence?.grain || EffervescenceGrain.Fine
    );

    const effervescencePersistence = ref<EffervescencePersistence>(
      localWineSheet.visualExam.effervescence?.persistence || EffervescencePersistence.Persistent
    );

    // Handle aroma types as a separate array for checkboxes
    const selectedAromaTypes = ref<AromaType[]>(
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
    watch(selectedAromaTypes, (newAromaTypes: AromaType[]): void => {
      localWineSheet.olfactoryExam.aromaTypes = [...newAromaTypes];
    });

    // Initialize values on component mount
    onMounted((): void => {
      isSparklingWine.value = !!localWineSheet.visualExam.effervescence;
      
      // Adjust color tone options based on wine type
      if (localWineSheet.wineType === WineType.WHITE && !isWhiteWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.StrawYellow;
      } else if (localWineSheet.wineType === WineType.ROSE && !isRoseWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.CherryPink;
      } else if (localWineSheet.wineType === WineType.RED && !isRedWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.RubyRed;
      }
    });

    // Color tone filtering helpers
    const isWhiteWineColorTone = (tone: ColorTone): boolean => {
      return [
        ColorTone.GreenishYellow,
        ColorTone.StrawYellow,
        ColorTone.GoldenYellow,
        ColorTone.AmberYellow
      ].includes(tone);
    };

    const isRoseWineColorTone = (tone: ColorTone): boolean => {
      return [
        ColorTone.LightPink,
        ColorTone.CherryPink,
        ColorTone.ClaretPink
      ].includes(tone);
    };

    const isRedWineColorTone = (tone: ColorTone): boolean => {
      return [
        ColorTone.PurpleRed,
        ColorTone.RubyRed,
        ColorTone.GranatRed,
        ColorTone.OrangeRed
      ].includes(tone);
    };

    // Watch for changes in wine type to update color tone options
    watch(() => localWineSheet.wineType, (newWineType: WineType): void => {
      if (newWineType === WineType.WHITE && !isWhiteWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.StrawYellow;
      } else if (newWineType === WineType.ROSE && !isRoseWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.CherryPink;
      } else if (newWineType === WineType.RED && !isRedWineColorTone(localWineSheet.visualExam.color.tone)) {
        localWineSheet.visualExam.color.tone = ColorTone.RubyRed;
      }
    });

    // Get color tone options based on wine type
    const getColorToneOptions = () => {
      if (localWineSheet.wineType === WineType.WHITE) {
        return {
          GreenishYellow: ColorTone.GreenishYellow,
          StrawYellow: ColorTone.StrawYellow,
          GoldenYellow: ColorTone.GoldenYellow,
          AmberYellow: ColorTone.AmberYellow
        };
      } else if (localWineSheet.wineType === WineType.ROSE) {
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
    const wineClassificationOptions = Object.values(WineClassification);

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
      WineClassification,
      wineClassificationLabels,
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
      evolutionaryStateOptions,
      wineClassificationOptions,
      WineType,
      wineTypeLabels
    };
  }
});