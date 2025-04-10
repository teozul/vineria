// tests/unit/services/StorageService.spec.ts
import { LocalStorageProvider } from '@/services/StorageService';
import { createEmptyWineTastingSheet, WineTastingSheet } from '@/models/WineTastingSheet';

// Mock local storage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string): string => {
      return store[key];
    }),
    setItem: jest.fn((key: string, value: string): void => {
      store[key] = value;
    }),
    clear: jest.fn((): void => {
      store = {};
    }),
    removeItem: jest.fn((key: string): void => {
      delete store[key];
    }),
    getAll: jest.fn((): Record<string, string> => store)
  };
})();

// Set up the mock before tests
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LocalStorageProvider', () => {
  let storageProvider: LocalStorageProvider;
  const WINE_STORAGE_KEY = 'wine-tasting-sheets';
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
    storageProvider = new LocalStorageProvider();
  });
  
  describe('getAll', () => {
    it('should return an empty array when no data is stored', async () => {
      const result = await storageProvider.getAll();
      expect(result).toEqual([]);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(WINE_STORAGE_KEY);
    });
    
    it('should return stored wine sheets', async () => {
      // Create sample data
      const sheet1 = createEmptyWineTastingSheet();
      sheet1.id = '123';
      sheet1.producer = 'Test Producer';
      
      const sheet2 = createEmptyWineTastingSheet();
      sheet2.id = '456';
      sheet2.producer = 'Another Producer';
      
      const mockData = [sheet1, sheet2];
      
      // Store the data
      localStorageMock.setItem(WINE_STORAGE_KEY, JSON.stringify(mockData));
      
      // Get the data
      const result = await storageProvider.getAll();
      
      // Expectations
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('123');
      expect(result[0].producer).toBe('Test Producer');
      expect(result[1].id).toBe('456');
      expect(result[1].producer).toBe('Another Producer');
    });
    
    it('should handle JSON parse errors gracefully', async () => {
      // Set invalid JSON
      localStorageMock.setItem(WINE_STORAGE_KEY, 'invalid-json');
      
      // Mock console.error to avoid cluttering test output
      console.error = jest.fn();
      
      const result = await storageProvider.getAll();
      
      // Should return empty array on error
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });
  
  describe('getById', () => {
    it('should return null when sheet with specified ID doesn\'t exist', async () => {
      const result = await storageProvider.getById('non-existent-id');
      expect(result).toBeNull();
    });
    
    it('should return the sheet with matching ID', async () => {
      // Create sample data
      const sheet1 = createEmptyWineTastingSheet();
      sheet1.id = '123';
      sheet1.producer = 'Test Producer';
      
      const sheet2 = createEmptyWineTastingSheet();
      sheet2.id = '456';
      sheet2.producer = 'Another Producer';
      
      const mockData = [sheet1, sheet2];
      
      // Store the data
      localStorageMock.setItem(WINE_STORAGE_KEY, JSON.stringify(mockData));
      
      // Get the data by ID
      const result = await storageProvider.getById('456');
      
      // Expectations
      expect(result).not.toBeNull();
      expect(result?.id).toBe('456');
      expect(result?.producer).toBe('Another Producer');
    });
  });
  
  describe('save', () => {
    it('should add a new sheet to storage', async () => {
      const newSheet = createEmptyWineTastingSheet();
      newSheet.producer = 'New Producer';
      
      const savedSheet = await storageProvider.save(newSheet);
      
      // Check the returned sheet
      expect(savedSheet).toEqual(newSheet);
      
      // Check localStorage was updated
      expect(localStorageMock.setItem).toHaveBeenCalled();
      
      // Check sheet is now in storage
      const sheets = await storageProvider.getAll();
      expect(sheets).toHaveLength(1);
      expect(sheets[0].producer).toBe('New Producer');
    });
    
    it('should add a sheet to existing sheets', async () => {
      // Create existing data
      const existingSheet = createEmptyWineTastingSheet();
      existingSheet.id = '123';
      existingSheet.producer = 'Existing Producer';
      
      localStorageMock.setItem(WINE_STORAGE_KEY, JSON.stringify([existingSheet]));
      
      // Add new sheet
      const newSheet = createEmptyWineTastingSheet();
      newSheet.id = '456';
      newSheet.producer = 'New Producer';
      
      await storageProvider.save(newSheet);
      
      // Check both sheets are in storage
      const sheets = await storageProvider.getAll();
      expect(sheets).toHaveLength(2);
      expect(sheets[0].producer).toBe('Existing Producer');
      expect(sheets[1].producer).toBe('New Producer');
    });
  });
  
  describe('update', () => {
    it('should update an existing sheet', async () => {
      // Create existing data
      const existingSheet = createEmptyWineTastingSheet();
      existingSheet.id = '123';
      existingSheet.producer = 'Existing Producer';
      existingSheet.denomination = 'Original Denomination';
      
      localStorageMock.setItem(WINE_STORAGE_KEY, JSON.stringify([existingSheet]));
      
      // Update the sheet
      const updatedSheet = { ...existingSheet };
      updatedSheet.denomination = 'Updated Denomination';
      
      const result = await storageProvider.update(updatedSheet);
      
      // Check the returned sheet
      expect(result.denomination).toBe('Updated Denomination');
      
      // Check sheet is updated in storage
      const sheets = await storageProvider.getAll();
      expect(sheets).toHaveLength(1);
      expect(sheets[0].denomination).toBe('Updated Denomination');
    });
    
    it('should throw an error when updating non-existent sheet', async () => {
      const nonExistentSheet = createEmptyWineTastingSheet();
      nonExistentSheet.id = 'non-existent-id';
      
      // Mock console.error to avoid cluttering test output
      console.error = jest.fn();
      
      await expect(storageProvider.update(nonExistentSheet))
        .rejects
        .toThrow();
    });
  });
  
  describe('delete', () => {
    it('should delete an existing sheet', async () => {
      // Create existing data
      const sheet1 = createEmptyWineTastingSheet();
      sheet1.id = '123';
      sheet1.producer = 'Producer 1';
      
      const sheet2 = createEmptyWineTastingSheet();
      sheet2.id = '456';
      sheet2.producer = 'Producer 2';
      
      localStorageMock.setItem(WINE_STORAGE_KEY, JSON.stringify([sheet1, sheet2]));
      
      // Delete one sheet
      const result = await storageProvider.delete('123');
      
      // Check the result
      expect(result).toBe(true);
      
      // Check sheet is deleted from storage
      const sheets = await storageProvider.getAll();
      expect(sheets).toHaveLength(1);
      expect(sheets[0].id).toBe('456');
    });
    
    it('should return false when deleting non-existent sheet', async () => {
      const result = await storageProvider.delete('non-existent-id');
      expect(result).toBe(false);
    });
  });
  
  describe('importData', () => {
    it('should replace all existing data with imported data', async () => {
      // Create existing data
      const existingSheet = createEmptyWineTastingSheet();
      existingSheet.id = '123';
      existingSheet.producer = 'Existing Producer';
      
      localStorageMock.setItem(WINE_STORAGE_KEY, JSON.stringify([existingSheet]));
      
      // Import new data
      const importedSheet1 = createEmptyWineTastingSheet();
      importedSheet1.id = '456';
      importedSheet1.producer = 'Imported Producer 1';
      
      const importedSheet2 = createEmptyWineTastingSheet();
      importedSheet2.id = '789';
      importedSheet2.producer = 'Imported Producer 2';
      
      const importedData = [importedSheet1, importedSheet2];
      
      const result = await storageProvider.importData(importedData);
      
      // Check the result
      expect(result).toBe(true);
      
      // Check imported data replaced existing data
      const sheets = await storageProvider.getAll();
      expect(sheets).toHaveLength(2);
      expect(sheets[0].id).toBe('456');
      expect(sheets[1].id).toBe('789');
    });
  });
  
  describe('exportData', () => {
    it('should return all stored data', async () => {
      // Create existing data
      const sheet1 = createEmptyWineTastingSheet();
      sheet1.id = '123';
      sheet1.producer = 'Producer 1';
      
      const sheet2 = createEmptyWineTastingSheet();
      sheet2.id = '456';
      sheet2.producer = 'Producer 2';
      
      localStorageMock.setItem(WINE_STORAGE_KEY, JSON.stringify([sheet1, sheet2]));
      
      // Export data
      const exportedData = await storageProvider.exportData();
       
      // Check exported data
      expect(exportedData).toHaveLength(2);
      expect(exportedData[0].id).toBe('123');
      expect(exportedData[1].id).toBe('456');
    });
  });
});