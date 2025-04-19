// tests/unit/models/WineTastingSheet.spec.ts
import {
  createEmptyWineTastingSheet,
  WineType
} from '@/models/WineTastingSheet';

describe('WineTastingSheet', () => {
  describe('createEmptyWineTastingSheet', () => {
    it('should create an empty wine tasting sheet with default values', () => {
      const sheet = createEmptyWineTastingSheet();

      expect(sheet).toBeDefined();
      expect(sheet.id).toBeDefined();
      expect(sheet.location).toBe('');
      expect(sheet.date).toBeDefined();
      expect(sheet.time).toBeDefined();
      expect(sheet.denomination).toBe('');
      expect(sheet.alcoholContent).toBe(0);
      expect(sheet.temperature).toBe(0);
      expect(sheet.vintage).toBe(new Date().getFullYear());
      expect(sheet.wineType).toBe(WineType.RED);
      expect(sheet.visualExam).toBeDefined();
      expect(sheet.olfactoryExam).toBeDefined();
      expect(sheet.gustatoryExam).toBeDefined();
      expect(sheet.evolutionaryState).toBeDefined();
      expect(sheet.finalConsiderations).toBe('');
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