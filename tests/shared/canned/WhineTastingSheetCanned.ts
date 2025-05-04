import WineTastingSheet, { createEmptyWineTastingSheet, WineClassification, WineType, LimpidityLevel, TransparencyLevel, ColorTone, ColorIntensity, FluidityLevel, EffervescenceGrain, EffervescencePersistence, OlfactoryIntensity, OlfactoryFranchness, OlfactoryFineness, AromaType, OlfactoryComplexity, BodyLevel, Balance, AlcoholLevel, SoftnessLevel, SugarLevel, AcidityLevel, SalinityLevel, TanninLevel, RetroOlfactoryQuality, RetroOlfactoryPersistence, EvolutionaryState } from "@/models/WineTastingSheet";


export const createMockWineSheet = (): WineTastingSheet => {
  const wineSheet = createEmptyWineTastingSheet();
  wineSheet.id = "123"
  wineSheet.denomination = 'Chianti Classico';
  wineSheet.producer = 'Antinori';
  wineSheet.classification = WineClassification.DOCG;
  wineSheet.vintage = 2018;
  wineSheet.alcoholContent = 13.5;
  wineSheet.temperature = 18;
  wineSheet.location = 'Toscana';
  wineSheet.date = '2023-01-01';
  wineSheet.time = '14:30';
  wineSheet.wineType = WineType.RED;

  // Visual examination
  wineSheet.visualExam = {
    limpidity: LimpidityLevel.LIMPID,
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
  wineSheet.olfactoryExam = {
    intensity: OlfactoryIntensity.Intense,
    quality: {
      franchness: OlfactoryFranchness.Clear,
      fineness: OlfactoryFineness.VeryFine
    },
    aromaTypes: [AromaType.Fruity, AromaType.Woody, AromaType.Balsamic],
    complexity: OlfactoryComplexity.Complex
  };

  // Gustatory examination
  wineSheet.gustatoryExam = {
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

  wineSheet.evolutionaryState = EvolutionaryState.READY;
  wineSheet.finalConsiderations = 'Proprio un signor vino.';

  return wineSheet;
};

export const createMockWineSheets = (): WineTastingSheet[] => {
  const sheet1 = createEmptyWineTastingSheet();
  sheet1.id = '1';
  sheet1.denomination = 'Chianti Classico';
  sheet1.producer = 'Producer 1';
  sheet1.vintage = 2018;
  sheet1.wineType = WineType.RED;
  sheet1.classification = WineClassification.DOCG;
  sheet1.date = '2023-01-01';

  const sheet2 = createEmptyWineTastingSheet();
  sheet2.id = '2';
  sheet2.denomination = 'Vermentino';
  sheet2.producer = 'Producer 2';
  sheet2.vintage = 2020;
  sheet2.wineType = WineType.WHITE;
  sheet2.classification = WineClassification.DOC;
  sheet2.date = '2023-02-15';

  const sheet3 = createEmptyWineTastingSheet();
  sheet3.id = '3';
  sheet3.denomination = 'Cerasuolo';
  sheet3.producer = 'Producer 3';
  sheet3.vintage = 2021;
  sheet3.wineType = WineType.ROSE;
  sheet3.classification = WineClassification.DOC;
  sheet3.date = '2023-03-20';

  return [sheet1, sheet2, sheet3];
};