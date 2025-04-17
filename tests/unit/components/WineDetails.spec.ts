import { mount } from '@vue/test-utils';
import WineDetails from '@/components/WineDetails.vue';
import { 
  WineTastingSheet, 
  createEmptyWineTastingSheet,
  LimpidityLevel,
  TransparencyLevel,
  ColorTone,
  ColorIntensity,
  FluidityLevel,
  EffervescenceGrain,
  EffervescencePersistence,
  OlfactoryIntensity,
  OlfactoryFranchness,
  OlfactoryFineness,
  AromaType,
  OlfactoryComplexity,
  BodyLevel,
  AlcoholLevel,
  SoftnessLevel,
  SugarLevel,
  AcidityLevel,
  SalinityLevel,
  TanninLevel,
  Balance,
  RetroOlfactoryQuality,
  RetroOlfactoryPersistence,
  EvolutionaryState
} from '@/models/WineTastingSheet';

describe('WineDetails.vue', () => {
  // Helper function to create a mock wine sheet
  const createMockWineSheet = (): WineTastingSheet => {
    const sheet = createEmptyWineTastingSheet();
    sheet.denomination = 'Chianti Classico';
    sheet.producer = 'Antinori';
    sheet.classification = 'DOCG';
    sheet.vintage = 2018;
    sheet.alcoholContent = 13.5;
    sheet.temperature = 18;
    sheet.location = 'Tuscany';
    sheet.date = '2023-01-01';
    sheet.time = '14:30';
    sheet.wineType = 'Rosso';

    // Visual examination
    sheet.visualExam = {
      limpidity: LimpidityLevel.Limpid,
      transparency: TransparencyLevel.Transparent,
      color: {
        tone: ColorTone.RubyRed,
        intensity: ColorIntensity.Intense
      },
      fluidity: FluidityLevel.Fluid,
      effervescence: {
        grain: EffervescenceGrain.Fine,
        persistence: EffervescencePersistence.Persistent
      }
    };

    // Olfactory examination
    sheet.olfactoryExam = {
      intensity: OlfactoryIntensity.Intense,
      quality: {
        franchness: OlfactoryFranchness.Clear,
        fineness: OlfactoryFineness.VeryFine
      },
      aromaTypes: [AromaType.Fruity, AromaType.Woody, AromaType.Balsamic],
      complexity: OlfactoryComplexity.Complex
    };

    // Gustatory examination
    sheet.gustatoryExam = {
      body: BodyLevel.Structured,
      balance: Balance.Harmonic,
      softElements: {
        alcoholLevel: AlcoholLevel.Warm,
        softness: SoftnessLevel.Soft,
        sugars: SugarLevel.Dry
      },
      hardElements: {
        acidity: AcidityLevel.Fresh,
        salinity: SalinityLevel.SlightlySaline,
        tannins: TanninLevel.Tannic
      },
      retroOlfactory: {
        intensity: OlfactoryIntensity.Intense,
        quality: RetroOlfactoryQuality.Fine,
        mouthAroma: {
          persistence: RetroOlfactoryPersistence.Persistent
        }
      }
    };

    sheet.evolutionaryState = EvolutionaryState.Ready;
    sheet.finalConsiderations = 'A well-balanced wine with good aging potential.';

    return sheet;
  };

  it('displays no data message when wineSheet prop is null', () => {
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: null
      }
    });

    expect(wrapper.find('.no-data').exists()).toBe(true);
    expect(wrapper.find('.no-data').text()).toContain('No wine tasting sheet data available.');
    expect(wrapper.find('.wine-details').exists()).toBe(false);
  });

  it('renders wine details when wineSheet prop is provided', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    expect(wrapper.find('.no-data').exists()).toBe(false);
    expect(wrapper.find('.wine-details').exists()).toBe(true);
  });

  it('applies correct CSS class based on wine type', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const badge = wrapper.find('.wine-badge');
    expect(badge.classes()).toContain('wine-badge-red');
    expect(badge.text()).toBe('Rosso');
  });

  it('formats date correctly', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    // Mock Date.toLocaleDateString to return a predictable output
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = function() {
      return '1/1/2023'; // Match the actual format we're getting
    };

    // Find the detail item that contains the date
    const dateDetailItem = wrapper.findAll('.detail-item').find(item => 
      item.find('.detail-label').text() === 'Tasted On'
    );
    
    // Ensure the element exists before checking its text
    expect(dateDetailItem).toBeTruthy();
    if (dateDetailItem) {
      const dateValue = dateDetailItem.find('.detail-value');
      expect(dateValue.text()).toContain('1/1/2023');
      expect(dateValue.text()).toContain('at 14:30');
    }

    // Restore original method
    Date.prototype.toLocaleDateString = originalToLocaleDateString;
  });

  it('displays all sections correctly', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    // Check section titles
    expect(wrapper.find('.section-title').text()).toBe('Basic Information');
    expect(wrapper.findAll('.section-title')[1].text()).toBe('Visual Examination');
    expect(wrapper.findAll('.section-title')[2].text()).toBe('Olfactory Examination');
    expect(wrapper.findAll('.section-title')[3].text()).toBe('Gustatory Examination');
    expect(wrapper.findAll('.section-title')[4].text()).toBe('Final Evaluation');

    // Check some key values
    expect(wrapper.text()).toContain('Chianti Classico');
    expect(wrapper.text()).toContain('Antinori');
    expect(wrapper.text()).toContain('DOCG');
    expect(wrapper.text()).toContain('2018');
    expect(wrapper.text()).toContain('13.5%');
    expect(wrapper.text()).toContain('18°C');
  });

  it('displays aroma types as tags', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const tags = wrapper.findAll('.tag');
    expect(tags.length).toBe(3);
    expect(tags[0].text()).toBe('Fruttato');
    expect(tags[1].text()).toBe('Legnoso');
    expect(tags[2].text()).toBe('Balsamico');
  });

  it('handles missing final considerations gracefully', () => {
    const mockSheet = createMockWineSheet();
    mockSheet.finalConsiderations = '';
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const considerations = wrapper.find('.consideration-text');
    expect(considerations.text()).toBe('No final considerations provided.');
  });

  it('displays all gustatory examination subsections', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const subsectionTitles = wrapper.findAll('.subsection-title');
    expect(subsectionTitles[0].text()).toBe('Structure and Balance');
    expect(subsectionTitles[1].text()).toBe('Soft Elements');
    expect(subsectionTitles[2].text()).toBe('Hard Elements');
    expect(subsectionTitles[3].text()).toBe('Retro-Olfactory');
  });
}); 