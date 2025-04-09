// Wine Tasting Sheet TypeScript Interfaces and Classes

// Enums for various categorical ratings
export enum LimpidityLevel {
    Turbid = 'Torbido',
    Veiled = 'Velato',
    Limpid = 'Limpido',
    Crystal = 'Cristallino',
    Brilliant = 'Brillante'
}

export enum TransparencyLevel {
    Impenetrable = 'Impenetrabile',
    LowTransparent = 'Poco trasparente',
    Transparent = 'Trasparente'
}

export enum ColorTone {
    // White wine tones
    GreenishYellow = 'Giallo verdolino',
    StrawYellow = 'Giallo paglierino',
    GoldenYellow = 'Giallo dorato',
    AmberYellow = 'Giallo ambrato',
    
    // Rose wine tones
    LightPink = 'Rosa tenue',
    CherryPink = 'Rosa cerasuolo',
    ClaretPink = 'Rosa chiaretto',
    
    // Red wine tones
    PurpleRed = 'Rosso porpora',
    RubyRed = 'Rosso rubino',
    GranatRed = 'Rosso granato',
    OrangeRed = 'Rosso aranciato'
}

export enum ColorIntensity {
    Light = 'Tenue',
    SlightlyIntense = 'Poco intenso',
    Intense = 'Intenso',
    VeryIntense = 'Molto intenso'
}

export enum FluidityLevel {
    Fluid = 'Scorrevole',
    NotDense = 'Poco denso',
    Dense = 'Denso',
    VeryDense = 'Molto denso'
}

export enum EffervescenceGrain {
    Coarse = 'Grossolana',
    Fine = 'Fine',
    VeryFine = 'Molto fine'
}

export enum EffervescencePersistence {
    Evanescent = 'Evanescente',
    Persistent = 'Persistente',
    VeryPersistent = 'Molto persistente'
}

export enum OlfactoryIntensity {
    Light = 'Tenue',
    SlightlyIntense = 'Poco intenso',
    Intense = 'Intenso',
    VeryIntense = 'Molto intenso'
}

export enum OlfactoryFranchness {
    NotClear = 'Poco schietto',
    Sufficient = 'Sufficiente',
    Clear = 'Schietto'
}

export enum OlfactoryFineness {
    Common = 'Comune',
    MediumFine = 'Mediamente fine',
    Fine = 'Fine',
    VeryFine = 'Molto fine'
}

export enum AromaType {
    Aromatic = 'Aromatico',
    Floral = 'Floreale',
    Fruity = 'Fruttato',
    Vegetable = 'Vegetale',
    Balsamic = 'Balsamico',
    DryFruit = 'Fruttato secco',
    Mineral = 'Minerale',
    Woody = 'Legnoso',
    Ethereal = 'Etereo',
    Chemical = 'Chimico'
}

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

export enum SugarLevel {
    Dry = 'Secco',
    OffDry = 'Abboccato',
    Sweet = 'Amabile',
    VerySweet = 'Dolce',
    ExtremelySweet = 'Molto dolce'
}

export enum AcidityLevel {
    Scarce = 'Scarno',
    Fresh = 'Fresco',
    VividFresh = 'Fresco vivo',
    Unripe = 'Acerbo'
}

export enum SalinityLevel {
    NotPerceptible = 'Non percettibile',
    SlightlySaline = 'Leggerm. sapido',
    Saline = 'Sapido',
    VerySaline = 'Molto sapido'
}

export enum TanninLevel {
    LowTannic = 'Poco tannico',
    JustTannic = 'Giusto tannico',
    Tannic = 'Tannico',
    HighlyTannic = 'Allappante'
}

export enum Balance {
    Disharmonic = 'Disarmonico',
    SlightlyDisharmonic = 'Leggerm. disarmonico',
    Balanced = 'Equilibrato',
    Harmonic = 'Armonico'
}

export enum RetroOlfactoryQuality {
    Common = 'Comune',
    SlightlyFine = 'Poco fine',
    SomewhatFine = 'Abbastanza fine',
    Fine = 'Fine',
    Excellent = 'Eccellente'
}

export enum RetroOlfactoryPersistence {
    LowPersistent = 'Poco persistente',
    Persistent = 'Persistente',
    VeryPersistent = 'Molto persistente'
}

export enum EvolutionaryState {
    Young = 'Giovane',
    Ready = 'Pronto',
    Mature = 'Maturo',
    Evolved = 'Evoluto',
    Passed = 'Passato'
}

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
    classification: string; // IGT, DOC, DOCG
    producer: string;
    wineType: 'Rosso' | 'Bianco' | 'Rosé';

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
        id: new Date().toDateString(),
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        
        denomination: '',
        alcoholContent: 0, 
        temperature: 0,
        vintage: new Date().getFullYear(),
        classification: '',
        producer: '',
        wineType: 'Rosso',
        
        visualExam: {
            limpidity: LimpidityLevel.Limpid,
            transparency: TransparencyLevel.Transparent,
            color: {
                tone: ColorTone.RubyRed,
                intensity: ColorIntensity.Intense
            },
            fluidity: FluidityLevel.NotDense
        },
        
        olfactoryExam: {
            intensity: OlfactoryIntensity.Intense,
            quality: {
                franchness: OlfactoryFranchness.Clear,
                fineness: OlfactoryFineness.Fine
            },
            aromaTypes: [AromaType.Fruity],
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
                intensity: OlfactoryIntensity.Intense,
                quality: RetroOlfactoryQuality.Fine,
                mouthAroma: {
                    persistence: RetroOlfactoryPersistence.Persistent
                }
            }
        },
        
        evolutionaryState: EvolutionaryState.Ready,
        finalConsiderations: ''
    };
}

export default WineTastingSheet;