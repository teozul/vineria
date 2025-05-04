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
    Simple = 'Semplice',
    MediumComplex = 'Mediamente complesso',
    Complex = 'Complesso',
    Sumptuous = 'Sontuoso'
}

export enum BodyLevel {
    Light = 'Leggero',
    Body = 'Di corpo',
    Structured = 'Strutturato',
    Robust = 'Robusto'
}

export enum AlcoholLevel {
    Weak = 'Debole',
    Light = 'Leggero',
    Warm = 'Caldo',
    VeryWarm = 'Molto caldo',
    Alcoholic = 'Alcolico'
}

export enum SoftnessLevel {
    LittleSoft = 'Poco morbido',
    Soft = 'Morbido',
    Pasty = 'Pastoso',
    Fatty = 'Grasso'
}

export const softnessLevelLabels = {
    [SoftnessLevel.LittleSoft]: 'Poco morbido',
    [SoftnessLevel.Soft]: 'Morbido',
    [SoftnessLevel.Pasty]: 'Pastoso',
    [SoftnessLevel.Fatty]: 'Grasso'
};

export enum SugarLevel {
    Dry = 'Secco',
    OffDry = 'Abboccato',
    Sweet = 'Amabile',
    VerySweet = 'Dolce',
    ExtremelySweet = 'Molto dolce'
}

export const sugarLevelLabels = {
    [SugarLevel.Dry]: 'Secco',
    [SugarLevel.OffDry]: 'Abboccato',
    [SugarLevel.Sweet]: 'Amabile',
    [SugarLevel.VerySweet]: 'Dolce',
    [SugarLevel.ExtremelySweet]: 'Molto dolce'
};

export enum AcidityLevel {
    Scarce = 'Scarno',
    Fresh = 'Fresco',
    VividFresh = 'Fresco vivo',
    Unripe = 'Acerbo'
}

export const acidityLevelLabels = {
    [AcidityLevel.Scarce]: 'Scarno',
    [AcidityLevel.Fresh]: 'Fresco',
    [AcidityLevel.VividFresh]: 'Fresco vivo',
    [AcidityLevel.Unripe]: 'Acerbo'
};

export enum SalinityLevel {
    NotPerceptible = 'Non percettibile',
    SlightlySaline = 'Leggerm. sapido',
    Saline = 'Sapido',
    VerySaline = 'Molto sapido'
}

export const salinityLevelLabels = {
    [SalinityLevel.NotPerceptible]: 'Non percettibile',
    [SalinityLevel.SlightlySaline]: 'Leggerm. sapido',
    [SalinityLevel.Saline]: 'Sapido',
    [SalinityLevel.VerySaline]: 'Molto sapido'
};

export enum TanninLevel {
    LowTannic = 'Poco tannico',
    JustTannic = 'Giusto tannico',
    Tannic = 'Tannico',
    HighlyTannic = 'Allappante'
}


export const tanninLevelLabels = {
    [TanninLevel.LowTannic]: 'Poco tannico',
    [TanninLevel.JustTannic]: 'Giusto tannico',
    [TanninLevel.Tannic]: 'Tannico',
    [TanninLevel.HighlyTannic]: 'Allappante'
};

export enum Balance {
    Disharmonic = 'Disarmonico',
    SlightlyDisharmonic = 'Leggerm. disarmonico',
    Balanced = 'Equilibrato',
    Harmonic = 'Armonico'
}

export const balanceLabels = {
    [Balance.Disharmonic]: 'Disarmonico',
    [Balance.SlightlyDisharmonic]: 'Leggerm. disarmonico',
    [Balance.Balanced]: 'Equilibrato',
    [Balance.Harmonic]: 'Armonico'
};

export enum RetroOlfactoryQuality {
    Common = 'Comune',
    SlightlyFine = 'Poco fine',
    SomewhatFine = 'Abbastanza fine',
    Fine = 'Fine',
    Excellent = 'Eccellente'
}

export const retroOlfactoryQualityLabels = {
    [RetroOlfactoryQuality.Common]: 'Comune',
    [RetroOlfactoryQuality.SlightlyFine]: 'Poco fine',
    [RetroOlfactoryQuality.SomewhatFine]: 'Abbastanza fine',
    [RetroOlfactoryQuality.Fine]: 'Fine',
    [RetroOlfactoryQuality.Excellent]: 'Eccellente'
};

export enum RetroOlfactoryPersistence {
    LowPersistent = 'Poco persistente',
    Persistent = 'Persistente',
    VeryPersistent = 'Molto persistente'
}

export const retroOlfactoryPersistenceLabels = {
    [RetroOlfactoryPersistence.LowPersistent]: 'Poco persistente',
    [RetroOlfactoryPersistence.Persistent]: 'Persistente',
    [RetroOlfactoryPersistence.VeryPersistent]: 'Molto persistente'
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
            complexity: OlfactoryComplexity.MediumComplex
        },

        gustatoryExam: {
            body: BodyLevel.Body,
            softElements: {
                alcoholLevel: AlcoholLevel.Warm,
                softness: SoftnessLevel.Soft,
                sugars: SugarLevel.Dry
            },
            hardElements: {
                acidity: AcidityLevel.Fresh,
                salinity: SalinityLevel.SlightlySaline,
                tannins: TanninLevel.JustTannic
            },
            balance: Balance.Balanced,
            retroOlfactory: {
                intensity: OlfactoryIntensity.INTENSE,
                quality: RetroOlfactoryQuality.Fine,
                mouthAroma: {
                    persistence: RetroOlfactoryPersistence.Persistent
                }
            }
        },

        evolutionaryState: EvolutionaryState.READY,
        finalConsiderations: ''
    };
}

export default WineTastingSheet;