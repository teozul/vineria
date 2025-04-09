/**
 * DataService.ts
 * 
 * This service provides methods for working with Wine Tasting Sheet data,
 * including CRUD operations and import/export functionality.
 */

import { WineTastingSheet, createEmptyWineTastingSheet } from '../models/WineTastingSheet';
import { storageService } from './StorageService';

export class DataService {
  // Get all wine tasting sheets
  async getAllSheets(): Promise<WineTastingSheet[]> {
    return storageService.getAll();
  }

  // Get a wine tasting sheet by ID
  async getSheetById(id: string): Promise<WineTastingSheet | null> {
    return storageService.getById(id);
  }

  // Create a new wine tasting sheet
  async createSheet(sheetData?: Partial<WineTastingSheet>): Promise<WineTastingSheet> {
    const newSheet = createEmptyWineTastingSheet();
    
    // Apply any provided data
    if (sheetData) {
      Object.assign(newSheet, sheetData);
    }
    
    return storageService.save(newSheet);
  }

  // Update an existing wine tasting sheet
  async updateSheet(sheet: WineTastingSheet): Promise<WineTastingSheet> {
    return storageService.update(sheet);
  }

  // Delete a wine tasting sheet
  async deleteSheet(id: string): Promise<boolean> {
    return storageService.delete(id);
  }

  // Export all wine tasting sheets as JSON
  async exportToJson(): Promise<string> {
    const data = await storageService.exportData();
    return JSON.stringify(data, null, 2);
  }

  // Import wine tasting sheets from JSON
  async importFromJson(jsonString: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString) as WineTastingSheet[];
      
      // Validate the data structure (basic validation)
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: not an array');
      }
      
      // Check if each item has at least an id property
      for (const item of data) {
        if (!item.id) {
          throw new Error('Invalid data: missing ID for one or more items');
        }
      }
      
      return storageService.importData(data);
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Download the JSON file
  downloadJsonFile(filename: string = 'wine-tasting-sheets.json'): void {
    this.exportToJson().then(jsonData => {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      a.href = url;
      a.download = filename;
      a.click();
      
      URL.revokeObjectURL(url);
    });
  }

  // Helper method to handle file upload and import
  handleFileUpload(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          if (event.target?.result) {
            const jsonData = event.target.result as string;
            const result = await this.importFromJson(jsonData);
            resolve(result);
          } else {
            reject(new Error('Failed to read file'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  }
}

// Create a singleton instance for application-wide use
export const dataService = new DataService();

export default dataService; 