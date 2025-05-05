/**
 * StorageService.ts
 * 
 * This service handles the storage operations for the wine tasting sheets.
 * Currently it uses localStorage, but is designed with an interface that could
 * be easily switched to a real database in the future.
 */

import { WineTastingSheet } from '../models/WineTastingSheet';

// Storage keys
const WINE_STORAGE_KEY = 'wine-tasting-sheets';

// Interface for storage providers
export interface IStorageProvider {
  getAll(): Promise<WineTastingSheet[]>;
  getById(id: string): Promise<WineTastingSheet | null>;
  save(sheet: WineTastingSheet): Promise<WineTastingSheet>;
  update(sheet: WineTastingSheet): Promise<WineTastingSheet>;
  delete(id: string): Promise<boolean>;
  importData(data: WineTastingSheet[]): Promise<boolean>;
  exportData(): Promise<WineTastingSheet[]>;
  search(query: string): Promise<WineTastingSheet[]>;
}

// LocalStorage implementation
export class LocalStorageProvider implements IStorageProvider {
  // Get all wine tasting sheets
  async getAll(): Promise<WineTastingSheet[]> {
    try {
      const data = localStorage.getItem(WINE_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as WineTastingSheet[];
    } catch (error) {
      console.error('Error retrieving wine sheets from localStorage:', error);
      return [];
    }
  }

  // Get a specific wine tasting sheet by ID
  async getById(id: string): Promise<WineTastingSheet | null> {
    try {
      const sheets = await this.getAll();
      return sheets.find(sheet => sheet.id === id) || null;
    } catch (error) {
      console.error('Error retrieving wine sheet by ID:', error);
      return null;
    }
  }

  // Save a new wine tasting sheet
  async save(sheet: WineTastingSheet): Promise<WineTastingSheet> {
    try {
      const sheets = await this.getAll();
      sheets.push(sheet);
      localStorage.setItem(WINE_STORAGE_KEY, JSON.stringify(sheets));
      return sheet;
    } catch (error) {
      console.error('Error saving wine sheet:', error);
      throw new Error('Failed to save wine tasting sheet');
    }
  }

  // Update an existing wine tasting sheet
  async update(sheet: WineTastingSheet): Promise<WineTastingSheet> {
    try {
      const sheets = await this.getAll();
      const index = sheets.findIndex(s => s.id === sheet.id);
      
      if (index === -1) {
        throw new Error(`Wine tasting sheet with ID ${sheet.id} not found`);
      }
      
      sheets[index] = sheet;
      localStorage.setItem(WINE_STORAGE_KEY, JSON.stringify(sheets));
      return sheet;
    } catch (error) {
      console.error('Error updating wine sheet:', error);
      throw new Error('Failed to update wine tasting sheet');
    }
  }

  // Delete a wine tasting sheet
  async delete(id: string): Promise<boolean> {
    try {
      const sheets = await this.getAll();
      const filteredSheets = sheets.filter(sheet => sheet.id !== id);
      
      if (filteredSheets.length === sheets.length) {
        return false; // No sheet was removed
      }
      
      localStorage.setItem(WINE_STORAGE_KEY, JSON.stringify(filteredSheets));
      return true;
    } catch (error) {
      console.error('Error deleting wine sheet:', error);
      return false;
    }
  }

  // Import data (replace all existing data)
  async importData(data: WineTastingSheet[]): Promise<boolean> {
    try {
      localStorage.setItem(WINE_STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Could be better
  private valueContainsQuery(value: any, searchQuery: string): boolean {
    if (value === null || value === undefined) return false;
    
    if (typeof value === 'string') {
      return value.toLowerCase().includes(searchQuery);
    }
    
    if (typeof value === 'number') {
      return value.toString().includes(searchQuery);
    }
    
    if (Array.isArray(value)) {
      return value.some(item => this.valueContainsQuery(item, searchQuery));
    }
    
    if (typeof value === 'object') {
      return Object.values(value).some(val => this.valueContainsQuery(val, searchQuery));
    }
    
    return false;
  }

  // Search wine tasting sheets by query string
  async search(query: string): Promise<WineTastingSheet[]> {
    try {
      const sheets = await this.getAll();
      const searchQuery = query.toLowerCase();
      
      return sheets.filter(sheet => this.valueContainsQuery(sheet, searchQuery));
    } catch (error) {
      console.error('Error searching wine sheets:', error);
      return [];
    }
  }

  // Export all data
  async exportData(): Promise<WineTastingSheet[]> {
    return this.getAll();
  }
}

// Factory for storage providers
export class StorageFactory {
  static getProvider(): IStorageProvider {
    // Currently only returns LocalStorageProvider
    // In the future, this could return different providers based on configuration
    return new LocalStorageProvider();
  }
}

// Singleton instance for application-wide use
export const storageService = StorageFactory.getProvider();

export default storageService;