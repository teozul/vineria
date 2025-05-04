export enum LimpidityLevel {
    TURBID = 'TURBID',
    VEILED = 'VEILED',
    LIMPID = 'LIMPID',
    CRYSTAL = 'CRYSTAL',
    BRILLIANT = 'BRILLIANT'
}

export const limpidityLevelLabels = {
    [LimpidityLevel.TURBID]: 'Turbido',
    [LimpidityLevel.VEILED]: 'Velato',
    [LimpidityLevel.LIMPID]: 'Limpido',
    [LimpidityLevel.CRYSTAL]: 'Cristallino',
    [LimpidityLevel.BRILLIANT]: 'Brillante'
};

export enum TransparencyLevel {
    IMPENETRABLE = 'IMPENETRABLE',
    LOW_TRANSPARENT = 'LOW_TRANSPARENT',
    TRANSPARENT = 'TRANSPARENT'
}

export const transparencyLevelLabels = {
    [TransparencyLevel.IMPENETRABLE]: 'Impenetrabile',
    [TransparencyLevel.LOW_TRANSPARENT]: 'Poco trasparente',
    [TransparencyLevel.TRANSPARENT]: 'Trasparente'
};

export enum ColorTone {
    // White wine tones
    GREENISH_YELLOW = 'GREENISH_YELLOW',
    STRAW_YELLOW = 'STRAW_YELLOW',
    GOLDEN_YELLOW = 'GOLDEN_YELLOW',
    AMBER_YELLOW = 'AMBER_YELLOW',

    // Rose wine tones
    LIGHT_PINK = 'LIGHT_PINK',
    CHERRY_PINK = 'CHERRY_PINK',
    CLARET_PINK = 'CLARET_PINK',

    // Red wine tones
    PURPLE_RED = 'PURPLE_RED',
    RUBY_RED = 'RUBY_RED',
    GRANAT_RED = 'GRANAT_RED',
    ORANGE_RED = 'ORANGE_RED'
}

export const colorToneLabels = {
    [ColorTone.GREENISH_YELLOW]: 'Giallo verdolino',
    [ColorTone.STRAW_YELLOW]: 'Giallo paglierino',
    [ColorTone.GOLDEN_YELLOW]: 'Giallo dorato',
    [ColorTone.AMBER_YELLOW]: 'Giallo ambrato',
    [ColorTone.LIGHT_PINK]: 'Rosa tenue',
    [ColorTone.CHERRY_PINK]: 'Rosa cerasuolo',
    [ColorTone.CLARET_PINK]: 'Rosa chiaretto',
    [ColorTone.PURPLE_RED]: 'Rosso porpora',
    [ColorTone.RUBY_RED]: 'Rosso rubino',
    [ColorTone.GRANAT_RED]: 'Rosso granato',
    [ColorTone.ORANGE_RED]: 'Rosso aranciato'
};

export enum ColorIntensity {
    LIGHT = 'LIGHT',
    SLIGHTLY_INTENSE = 'SLIGHTLY_INTENSE',
    INTENSE = 'INTENSE',
    VERY_INTENSE = 'VERY_INTENSE'
}

export const colorIntensityLabels = {
    [ColorIntensity.LIGHT]: 'Tenue',
    [ColorIntensity.SLIGHTLY_INTENSE]: 'Poco intenso',
    [ColorIntensity.INTENSE]: 'Intenso',
    [ColorIntensity.VERY_INTENSE]: 'Molto intenso'
};

export enum FluidityLevel {
    FLUID = 'FLUID',
    NOT_DENSE = 'NOT_DENSE',
    DENSE = 'DENSE',
    VERY_DENSE = 'VERY_DENSE'
}

export const fluidityLevelLabels = {
    [FluidityLevel.FLUID]: 'Scorrevole',
    [FluidityLevel.NOT_DENSE]: 'Poco denso',
    [FluidityLevel.DENSE]: 'Denso',
    [FluidityLevel.VERY_DENSE]: 'Molto denso'
};

export enum EffervescenceGrain {
    COARSE = 'COARSE',
    FINE = 'FINE',
    VERY_FINE = 'VERY_FINE'
}

export const effervescenceGrainLabels = {
    [EffervescenceGrain.COARSE]: 'Grossolana',
    [EffervescenceGrain.FINE]: 'Fine',
    [EffervescenceGrain.VERY_FINE]: 'Molto fine'
};

export enum EffervescencePersistence {
    EVANESCENT = 'EVANESCENT',
    PERSISTENT = 'PERSISTENT',
    VERY_PERSISTENT = 'VERY_PERSISTENT'
}

export const effervescencePersistenceLabels = {
    [EffervescencePersistence.EVANESCENT]: 'Evanescente',
    [EffervescencePersistence.PERSISTENT]: 'Persistente',
    [EffervescencePersistence.VERY_PERSISTENT]: 'Molto persistente'
};

export enum OlfactoryIntensity {
    LIGHT = 'LIGHT',
    SLIGHTLY_INTENSE = 'SLIGHTLY_INTENSE',
    INTENSE = 'INTENSE',
    VERY_INTENSE = 'VERY_INTENSE'
}

export const olfactoryIntensityLabels = {
    [OlfactoryIntensity.LIGHT]: 'Tenue',
    [OlfactoryIntensity.SLIGHTLY_INTENSE]: 'Poco intenso',
    [OlfactoryIntensity.INTENSE]: 'Intenso',
    [OlfactoryIntensity.VERY_INTENSE]: 'Molto intenso'
};

export enum OlfactoryFranchness {
    NOT_CLEAR = 'NOT_CLEAR',
    SUFFICIENT = 'SUFFICIENT',
    CLEAR = 'CLEAR'
}

export const olfactoryFranchnessLabels = {
    [OlfactoryFranchness.NOT_CLEAR]: 'Poco schietto',
    [OlfactoryFranchness.SUFFICIENT]: 'Sufficiente',
    [OlfactoryFranchness.CLEAR]: 'Schietto'
};

export enum OlfactoryFineness {
    COMMON = 'COMMON',
    MEDIUM_FINE = 'MEDIUM_FINE',
    FINE = 'FINE',
    VERY_FINE = 'VERY_FINE'
}
export const olfactoryFinenessLabels = {
    [OlfactoryFineness.COMMON]: 'Comune',
    [OlfactoryFineness.MEDIUM_FINE]: 'Mediamente fine',
    [OlfactoryFineness.FINE]: 'Fine',
    [OlfactoryFineness.VERY_FINE]: 'Molto fine'
};

export enum AromaType {
    AROMATIC = 'AROMATIC',
    FLORAL = 'FLORAL',
    FRUITY = 'FRUITY',
    VEGETABLE = 'VEGETABLE',
    BALSAMIC = 'BALSAMIC',
    DRYFRUIT = 'DRYFRUIT',
    MINERAL = 'MINERAL',
    WOODY = 'WOODY',
    ETHEREAL = 'ETHEREAL',
    CHEMICAL = 'CHEMICAL'
}

export const aromaTypeLabels = {
    [AromaType.AROMATIC]: 'Aromatico',
    [AromaType.FLORAL]: 'Floreale',
    [AromaType.FRUITY]: 'Fruttato',
    [AromaType.VEGETABLE]: 'Vegetale',
    [AromaType.BALSAMIC]: 'Balsamico',
    [AromaType.DRYFRUIT]: 'Fruttato secco',
    [AromaType.MINERAL]: 'Minerale',
    [AromaType.WOODY]: 'Legnoso',
    [AromaType.ETHEREAL]: 'Etereo',
    [AromaType.CHEMICAL]: 'Chimico'
};

export enum OlfactoryComplexity {
    SIMPLE = 'SIMPLE',
    MEDIUM_COMPLEX = 'MEDIUM_COMPLEX',
    COMPLEX = 'COMPLEX',
    SUMPTUOUS = 'SUMPTUOUS'
}

export const olfactoryComplexityLabels = {
    [OlfactoryComplexity.SIMPLE]: 'Semplice',
    [OlfactoryComplexity.MEDIUM_COMPLEX]: 'Mediamente complesso',
    [OlfactoryComplexity.COMPLEX]: 'Complesso',
    [OlfactoryComplexity.SUMPTUOUS]: 'Sontuoso'
};

export enum BodyLevel {
    LIGHT = 'LIGHT',
    BODY = 'BODY',
    STRUCTURED = 'STRUCTURED',
    ROBUST = 'ROBUST'
}

export const bodyLevelLabels = {
    [BodyLevel.LIGHT]: 'Leggero',
    [BodyLevel.BODY]: 'Di corpo',
    [BodyLevel.STRUCTURED]: 'Strutturato',
    [BodyLevel.ROBUST]: 'Robusto'
};

export enum AlcoholLevel {
    WEAK = 'WEAK',
    LIGHT = 'LIGHT',
    WARM = 'WARM',
    VERYWARM = 'VERYWARM',
    ALCOHOLIC = 'ALCOHOLIC'
}

export const alcoholLevelLabels = {
    [AlcoholLevel.WEAK]: 'Debole',
    [AlcoholLevel.LIGHT]: 'Leggero',
    [AlcoholLevel.WARM]: 'Caldo',
    [AlcoholLevel.VERYWARM]: 'Molto caldo',
    [AlcoholLevel.ALCOHOLIC]: 'Alcolico'
}

export enum SoftnessLevel {
    LITTLE_SOFT = 'LITTLE_SOFT',
    SOFT = 'SOFT',
    PASTY = 'PASTY',
    FATTY = 'FATTY'
}

export const softnessLevelLabels = {
    [SoftnessLevel.LITTLE_SOFT]: 'Poco morbido',
    [SoftnessLevel.SOFT]: 'Morbido',
    [SoftnessLevel.PASTY]: 'Pastoso',
    [SoftnessLevel.FATTY]: 'Grasso'
};

export enum SugarLevel {
    DRY = 'DRY',
    OFF_DRY = 'OFF_DRY',
    SWEET = 'SWEET',
    VERY_SWEET = 'VERY_SWEET',
    EXTREMELY_SWEET = 'EXTREMELY_SWEET'
}

export const sugarLevelLabels = {
    [SugarLevel.DRY]: 'Secco',
    [SugarLevel.OFF_DRY]: 'Abboccato',
    [SugarLevel.SWEET]: 'Amabile',
    [SugarLevel.VERY_SWEET]: 'Dolce',
    [SugarLevel.EXTREMELY_SWEET]: 'Molto dolce'
};

export enum AcidityLevel {
    SCARCE = 'SCARCE',
    FRESH = 'FRESH',
    VIVID_FRESH = 'VIVID_FRESH',
    UNRIPE = 'UNRIPE'
}

export const acidityLevelLabels = {
    [AcidityLevel.SCARCE]: 'Scarno',
    [AcidityLevel.FRESH]: 'Fresco',
    [AcidityLevel.VIVID_FRESH]: 'Fresco vivo',
    [AcidityLevel.UNRIPE]: 'Acerbo'
};

export enum SalinityLevel {
    NOT_PERCEPTIBLE = 'NOT_PERCEPTIBLE',
    SLIGHTLY_SALINE = 'SLIGHTLY_SALINE',
    SALINE = 'SALINE',
    VERY_SALINE = 'VERY_SALINE'
}

export const salinityLevelLabels = {
    [SalinityLevel.NOT_PERCEPTIBLE]: 'Non percettibile',
    [SalinityLevel.SLIGHTLY_SALINE]: 'Leggerm. sapido',
    [SalinityLevel.SALINE]: 'Sapido',
    [SalinityLevel.VERY_SALINE]: 'Molto sapido'
};

export enum TanninLevel {
    LOW_TANNIC = 'LOW_TANNIC',
    JUST_TANNIC = 'JUST_TANNIC',
    TANNIC = 'TANNIC',
    HIGHLY_TANNIC = 'HIGHLY_TANNIC'
}

export const tanninLevelLabels = {
    [TanninLevel.LOW_TANNIC]: 'Poco tannico',
    [TanninLevel.JUST_TANNIC]: 'Giusto tannico',
    [TanninLevel.TANNIC]: 'Tannico',
    [TanninLevel.HIGHLY_TANNIC]: 'Allappante'
};

export enum Balance {
    DISHARMONIC = 'DISHARMONIC',
    SLIGHTLY_DISHARMONIC = 'SLIGHTLY_DISHARMONIC',
    BALANCED = 'BALANCED',
    HARMONIC = 'HARMONIC'
}

export const balanceLabels = {
    [Balance.DISHARMONIC]: 'Disarmonico',
    [Balance.SLIGHTLY_DISHARMONIC]: 'Leggerm. disarmonico',
    [Balance.BALANCED]: 'Equilibrato',
    [Balance.HARMONIC]: 'Armonico'
};

export enum RetroOlfactoryQuality {
    COMMON = 'COMMON',
    SLIGHTLY_FINE = 'SLIGHTLY_FINE',
    SOMEWHAT_FINE = 'SOMEWHAT_FINE',
    FINE = 'FINE',
    EXCELLENT = 'EXCELLENT'
}

export const retroOlfactoryQualityLabels = {
    [RetroOlfactoryQuality.COMMON]: 'Comune',
    [RetroOlfactoryQuality.SLIGHTLY_FINE]: 'Poco fine',
    [RetroOlfactoryQuality.SOMEWHAT_FINE]: 'Abbastanza fine',
    [RetroOlfactoryQuality.FINE]: 'Fine',
    [RetroOlfactoryQuality.EXCELLENT]: 'Eccellente'
};

export enum RetroOlfactoryPersistence {
    LOW_PERSISTENT = 'LOW_PERSISTENT',
    PERSISTENT = 'PERSISTENT',
    VERY_PERSISTENT = 'VERY_PERSISTENT'
}

export const retroOlfactoryPersistenceLabels = {
    [RetroOlfactoryPersistence.LOW_PERSISTENT]: 'Poco persistente',
    [RetroOlfactoryPersistence.PERSISTENT]: 'Persistente',
    [RetroOlfactoryPersistence.VERY_PERSISTENT]: 'Molto persistente'
};

export enum EvolutionaryState {
    YOUNG = 'YOUNG',
    READY = 'READY',
    MATURE = 'MATURE',
    EVOLVED = 'EVOLVED',
    PASSED = 'PASSED'
}
export const evolutionaryStateLabels = {
    [EvolutionaryState.YOUNG]: 'Giovane',
    [EvolutionaryState.READY]: 'Pronto',
    [EvolutionaryState.MATURE]: 'Maturo',
    [EvolutionaryState.EVOLVED]: 'Evoluto',
    [EvolutionaryState.PASSED]: 'Passato'
};

export interface VisualExam {
    limpidity: LimpidityLevel;
    transparency: TransparencyLevel;
    color: {
        tone: ColorTone;
        intensity: ColorIntensity;
    };
    fluidity: FluidityLevel;
    effervescence?: {
        grain: EffervescenceGrain;
        persistence: EffervescencePersistence;
    };
}

export interface OlfactoryExam {
    intensity: OlfactoryIntensity;
    quality: {
        franchness: OlfactoryFranchness;
        fineness: OlfactoryFineness;
    };
    aromaTypes: AromaType[];
    complexity: OlfactoryComplexity;
}

export interface GustatoryExam {
    body: BodyLevel;
    softElements: {
        alcoholLevel: AlcoholLevel;
        softness: SoftnessLevel;
        sugars: SugarLevel;
    };
    hardElements: {
        acidity: AcidityLevel;
        salinity: SalinityLevel;
        tannins: TanninLevel;
    };
    balance: Balance;
    retroOlfactory: {
        intensity: OlfactoryIntensity;
        quality: RetroOlfactoryQuality;
        mouthAroma: {
            persistence: RetroOlfactoryPersistence;
        };
    };
}

export enum WineClassification {
    NONE = "NONE",
    IGT = 'IGT',
    DOC = 'DOC',
    DOCG = 'DOCG'
}

export const wineClassificationLabels = {
    [WineClassification.NONE]: 'Nessuna classificazione',
    [WineClassification.IGT]: 'Indicazione Geografica Tipica (IGT)',
    [WineClassification.DOC]: 'Denominazione di Origine Controllata (DOC)',
    [WineClassification.DOCG]: 'Denominazione di Origine Controllata e Garantita (DOCG)'
};

export enum WineType {
    RED = 'RED',
    WHITE = 'WHITE',
    ROSE = 'ROSE'
}

export const wineTypeLabels = {
    [WineType.RED]: 'Rosso',
    [WineType.WHITE]: 'Bianco',
    [WineType.ROSE]: 'Rosè',
};

// Main Wine Tasting Sheet Interface
export interface WineTastingSheet {
    id: string; // Unique identifier for each sheet

    // Basic Wine Information
    location: string;
    date: string; // ISO format date string
    time: string;

    // Wine Details
    denomination: string;
    alcoholContent: number;
    temperature: number;
    vintage: number;
    classification: WineClassification;
    producer: string;
    wineType: WineType;

    // Examination fields
    visualExam: VisualExam;
    olfactoryExam: OlfactoryExam;
    gustatoryExam: GustatoryExam;

    // Evolutionary State
    evolutionaryState: EvolutionaryState;

    // Final Considerations
    finalConsiderations: string;
}

// Factory function to create a new empty WineTastingSheet
export function createEmptyWineTastingSheet(): WineTastingSheet {
    return {
        id: new Date().getTime().toString(),
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),

        denomination: '',
        alcoholContent: 0,
        temperature: 0,
        vintage: new Date().getFullYear(),
        classification: WineClassification.NONE,
        producer: '',
        wineType: WineType.RED,

        visualExam: {
            limpidity: LimpidityLevel.LIMPID,
            transparency: TransparencyLevel.TRANSPARENT,
            color: {
                tone: ColorTone.RUBY_RED,
                intensity: ColorIntensity.INTENSE
            },
            fluidity: FluidityLevel.NOT_DENSE
        },

        olfactoryExam: {
            intensity: OlfactoryIntensity.INTENSE,
            quality: {
                franchness: OlfactoryFranchness.CLEAR,
                fineness: OlfactoryFineness.FINE
            },
            aromaTypes: [AromaType.FRUITY],
            complexity: OlfactoryComplexity.SIMPLE
        },

        gustatoryExam: {
            body: BodyLevel.LIGHT,
            softElements: {
                alcoholLevel: AlcoholLevel.WARM,
                softness: SoftnessLevel.SOFT,
                sugars: SugarLevel.DRY
            },
            hardElements: {
                acidity: AcidityLevel.FRESH,
                salinity: SalinityLevel.SLIGHTLY_SALINE,
                tannins: TanninLevel.JUST_TANNIC
            },
            balance: Balance.BALANCED,
            retroOlfactory: {
                intensity: OlfactoryIntensity.INTENSE,
                quality: RetroOlfactoryQuality.FINE,
                mouthAroma: {
                    persistence: RetroOlfactoryPersistence.PERSISTENT
                }
            }
        },

        evolutionaryState: EvolutionaryState.READY,
        finalConsiderations: ''
    };
}

export default WineTastingSheet;