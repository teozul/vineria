// tests/unit/services/DataService.spec.ts

import { DataService } from '@/services/DataService';
import { storageService } from '@/services/StorageService';
import { createEmptyWineTastingSheet, WineTastingSheet } from '@/models/WineTastingSheet';

// Mock the storageService
jest.mock('@/services/StorageService', () => {
  return {
    storageService: {
      getAll: jest.fn(),
      getById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      importData: jest.fn(),
      exportData: jest.fn(),
    }
  };
});

// Mock for document and URL functionality
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

const mockDocument = {
  createElement: jest.fn(() => ({
    href: '',
    download: '',
    click: jest.fn()
  }))
};
Object.defineProperty(global, 'document', { value: mockDocument });

describe('DataService', () => {
  let dataService: DataService;
  
  beforeEach(() => {
    jest.clearAllMocks();
    dataService = new DataService();
  });
  
  describe('getAllSheets', () => {
    it('should return all sheets from storage service', async () => {
      const mockSheets = [
        { id: '1', producer: 'Producer 1' },
        { id: '2', producer: 'Producer 2' }
      ] as WineTastingSheet[];
      
      (storageService.getAll as jest.Mock).mockResolvedValue(mockSheets);
      
      const result = await dataService.getAllSheets();
      
      expect(storageService.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockSheets);
    });
  });
  
  describe('getSheetById', () => {
    it('should return a sheet by ID from storage service', async () => {
      const mockSheet = { id: '1', producer: 'Producer 1' } as WineTastingSheet;
      
      (storageService.getById as jest.Mock).mockResolvedValue(mockSheet);
      
      const result = await dataService.getSheetById('1');
      
      expect(storageService.getById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockSheet);
    });
    
    it('should return null when sheet is not found', async () => {
      (storageService.getById as jest.Mock).mockResolvedValue(null);
      
      const result = await dataService.getSheetById('non-existent');
      
      expect(result).toBeNull();
    });
  });
  
  describe('createSheet', () => {
    it('should create a new sheet with default values', async () => {
      const mockSheet = createEmptyWineTastingSheet();
      (storageService.save as jest.Mock).mockResolvedValue(mockSheet);
      
      const result = await dataService.createSheet();
      
      expect(storageService.save).toHaveBeenCalled();
      expect(result).toEqual(mockSheet);
    });
    
    it('should create a new sheet with provided values', async () => {
      const sheetData = {
        producer: 'Test Producer',
        denomination: 'Test Denomination'
      };
      
      const savedSheet = {
        ...createEmptyWineTastingSheet(),
        ...sheetData
      };
      
      (storageService.save as jest.Mock).mockImplementation((sheet) => Promise.resolve(sheet));
      
      const result = await dataService.createSheet(sheetData);
      
      expect(storageService.save).toHaveBeenCalled();
      expect(result.producer).toBe('Test Producer');
      expect(result.denomination).toBe('Test Denomination');
    });
  });
  
  describe('updateSheet', () => {
    it('should update an existing sheet', async () => {
      const sheet = createEmptyWineTastingSheet();
      sheet.producer = 'Updated Producer';
      
      (storageService.update as jest.Mock).mockResolvedValue(sheet);
      
      const result = await dataService.updateSheet(sheet);
      
      expect(storageService.update).toHaveBeenCalledWith(sheet);
      expect(result).toEqual(sheet);
    });
  });
  
  describe('deleteSheet', () => {
    it('should delete a sheet by ID', async () => {
      (storageService.delete as jest.Mock).mockResolvedValue(true);
      
      const result = await dataService.deleteSheet('1');
      
      expect(storageService.delete).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });
  });
  
  describe('exportToJson', () => {
    it('should export data as formatted JSON string', async () => {
      const mockSheets = [
        { id: '1', producer: 'Producer 1' },
        { id: '2', producer: 'Producer 2' }
      ] as WineTastingSheet[];
      
      (storageService.exportData as jest.Mock).mockResolvedValue(mockSheets);
      
      const result = await dataService.exportToJson();
      
      expect(storageService.exportData).toHaveBeenCalled();
      expect(result).toBe(JSON.stringify(mockSheets, null, 2));
    });
  });
  
  describe('importFromJson', () => {
    it('should import valid JSON data', async () => {
      const mockSheets = [
        { id: '1', producer: 'Producer 1' },
        { id: '2', producer: 'Producer 2' }
      ];
      
      (storageService.importData as jest.Mock).mockResolvedValue(true);
      
      const result = await dataService.importFromJson(JSON.stringify(mockSheets));
      
      expect(storageService.importData).toHaveBeenCalledWith(mockSheets);
      expect(result).toBe(true);
    });
    
    it('should validate that input is an array', async () => {
      // Test with non-array data
      const nonArrayData = { id: '1', producer: 'Producer 1' };
      
      // Mock console.error to avoid cluttering test output
      console.error = jest.fn();
      
      const result = await dataService.importFromJson(JSON.stringify(nonArrayData));
      
      expect(storageService.importData).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
    
    it('should validate that each item has an ID', async () => {
      // Test with missing ID
      const invalidData = [
        { id: '1', producer: 'Producer 1' },
        { producer: 'Producer 2' } // Missing ID
      ];
      
      // Mock console.error to avoid cluttering test output
      console.error = jest.fn();
      
      const result = await dataService.importFromJson(JSON.stringify(invalidData));
      
      expect(storageService.importData).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
    
    it('should handle invalid JSON', async () => {
      // Mock console.error to avoid cluttering test output
      console.error = jest.fn();
      
      const result = await dataService.importFromJson('invalid-json');
      
      expect(storageService.importData).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
  
  describe('downloadJsonFile', () => {
    it('should create a download link for the JSON data', async () => {
      const mockSheets = [
        { id: '1', producer: 'Producer 1' },
        { id: '2', producer: 'Producer 2' }
      ] as WineTastingSheet[];
      
      (storageService.exportData as jest.Mock).mockResolvedValue(mockSheets);
      
      const mockAnchor = {
        href: '',
        download: '',
        click: jest.fn()
      };
      
      (document.createElement as jest.Mock).mockReturnValue(mockAnchor);
      (URL.createObjectURL as jest.Mock).mockReturnValue('blob-url');
      
      await dataService.downloadJsonFile('test-file.json');
      
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(mockAnchor.download).toBe('test-file.json');
      expect(mockAnchor.click).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob-url');
    });
    
    it('should use default filename if none provided', async () => {
      const mockSheets = [] as WineTastingSheet[];
      
      (storageService.exportData as jest.Mock).mockResolvedValue(mockSheets);
      
      const mockAnchor = {
        href: '',
        download: '',
        click: jest.fn()
      };
      
      (document.createElement as jest.Mock).mockReturnValue(mockAnchor);
      
      await dataService.downloadJsonFile();
      
      expect(mockAnchor.download).toBe('wine-tasting-sheets.json');
    });
  });
  
  describe('handleFileUpload', () => {
    it('should read a file and import its contents', async () => {
      const mockFileContent = JSON.stringify([{ id: '1' }]);
      const mockFile = new File([mockFileContent], 'test.json', { type: 'application/json' });
      
      // Mock FileReader
      const mockFileReader = {
        readAsText: jest.fn(function(file) {
          this.onload({ target: { result: mockFileContent } });
        }),
        onload: null,
        onerror: null
      };
      
      global.FileReader = jest.fn(() => mockFileReader) as any;
      
      // Mock importFromJson
      const importFromJsonSpy = jest.spyOn(dataService, 'importFromJson').mockResolvedValue(true);
      
      const result = await dataService.handleFileUpload(mockFile);
      
      expect(mockFileReader.readAsText).toHaveBeenCalledWith(mockFile);
      expect(importFromJsonSpy).toHaveBeenCalledWith(mockFileContent);
      expect(result).toBe(true);
    });
    
    it('should handle file reading errors', async () => {
      const mockFile = new File([''], 'test.json', { type: 'application/json' });
      
      // Mock FileReader with error
      const mockFileReader = {
        readAsText: jest.fn(function(file) {
          this.onerror();
        }),
        onload: null,
        onerror: null
      };
      
      global.FileReader = jest.fn(() => mockFileReader) as any;
      
      await expect(dataService.handleFileUpload(mockFile)).rejects.toThrow('Error reading file');
    });
    
    it('should handle null file content', async () => {
      const mockFile = new File([''], 'test.json', { type: 'application/json' });
      
      // Mock FileReader with null result
      const mockFileReader = {
        readAsText: jest.fn(function(file) {
          this.onload({ target: { result: null } });
        }),
        onload: null,
        onerror: null
      };
      
      global.FileReader = jest.fn(() => mockFileReader) as any;
      
      await expect(dataService.handleFileUpload(mockFile)).rejects.toThrow('Failed to read file');
    });
  });
});