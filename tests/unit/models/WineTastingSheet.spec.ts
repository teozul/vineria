// tests/unit/models/WineTastingSheet.spec.ts
import { 
    createEmptyWineTastingSheet, 
    WineTastingSheet, 
    LimpidityLevel,
    EvolutionaryState,
    ColorTone  
  } from '@/models/WineTastingSheet';
  
  describe('WineTastingSheet', () => {
    describe('createEmptyWineTastingSheet', () => {
      it('should create a new wine tasting sheet with default values', () => {
        const sheet = createEmptyWineTastingSheet();
        
        // Check that ID is generated (UUID format)
        expect(sheet.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        
        // Check default date is today
        const today = new Date().toISOString().split('T')[0];
        expect(sheet.date).toBe(today);
        
        // Check default wine type
        expect(sheet.wineType).toBe('Rosso');
        
        // Check default limpidity
        expect(sheet.visualExam.limpidity).toBe(LimpidityLevel.Limpid);
        
        // Check default evolutionary state
        expect(sheet.evolutionaryState).toBe(EvolutionaryState.Ready);
        
        // Check default color tone for Rosso
        expect(sheet.visualExam.color.tone).toBe(ColorTone.RubyRed);
      });
    });
    
    describe('WineTastingSheet structure', () => {
      it('should have all required properties', () => {
        const sheet = createEmptyWineTastingSheet();
        
        // Check basic fields
        expect(sheet).toHaveProperty('id');
        expect(sheet).toHaveProperty('location');
        expect(sheet).toHaveProperty('date');
        expect(sheet).toHaveProperty('time');
        expect(sheet).toHaveProperty('denomination');
        expect(sheet).toHaveProperty('alcoholContent');
        expect(sheet).toHaveProperty('temperature');
        expect(sheet).toHaveProperty('vintage');
        expect(sheet).toHaveProperty('classification');
        expect(sheet).toHaveProperty('producer');
        expect(sheet).toHaveProperty('wineType');
        
        // Check examination fields
        expect(sheet).toHaveProperty('visualExam');
        expect(sheet).toHaveProperty('olfactoryExam');
        expect(sheet).toHaveProperty('gustatoryExam');
        expect(sheet).toHaveProperty('evolutionaryState');
        expect(sheet).toHaveProperty('finalConsiderations');
        
        // Check nested examination fields
        expect(sheet.visualExam).toHaveProperty('limpidity');
        expect(sheet.visualExam).toHaveProperty('transparency');
        expect(sheet.visualExam).toHaveProperty('color');
        expect(sheet.visualExam.color).toHaveProperty('tone');
        expect(sheet.visualExam.color).toHaveProperty('intensity');
        
        expect(sheet.olfactoryExam).toHaveProperty('intensity');
        expect(sheet.olfactoryExam).toHaveProperty('quality');
        expect(sheet.olfactoryExam.quality).toHaveProperty('franchness');
        expect(sheet.olfactoryExam.quality).toHaveProperty('fineness');
        expect(sheet.olfactoryExam).toHaveProperty('aromaTypes');
        expect(Array.isArray(sheet.olfactoryExam.aromaTypes)).toBe(true);
        
        expect(sheet.gustatoryExam).toHaveProperty('body');
        expect(sheet.gustatoryExam).toHaveProperty('softElements');
        expect(sheet.gustatoryExam).toHaveProperty('hardElements');
        expect(sheet.gustatoryExam).toHaveProperty('balance');
        expect(sheet.gustatoryExam).toHaveProperty('retroOlfactory');
      });
    });
  });