import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import { dataService } from '@/services/DataService';
import ImportExportView from '@/views/ImportExportView.vue';
import { Labels } from '@/helpers/Labels';
import type { DOMWrapper } from '@vue/test-utils';

// Mock the dataService methods
jest.mock('@/services/DataService', () => ({
  dataService: {
    handleFileUpload: jest.fn(),
    downloadJsonFile: jest.fn()
  }
}));

describe('ImportExportView', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Mount the component
    wrapper = mount(ImportExportView);
  });

  it('renders import/export button', () => {
    expect(wrapper.find('.btn').exists()).toBe(true);
    expect(wrapper.find('.btn').text()).toBe(Labels.importExportData);
  });

  it('opens modal when import/export button is clicked', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('.modal-header h2').text()).toBe(Labels.importExportData);
  });

  it('closes modal when close button is clicked', async () => {
    // Open modal
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.find('.modal').exists()).toBe(true);

    // Close modal
    await wrapper.find('.modal-close').trigger('click');
    expect(wrapper.find('.modal').exists()).toBe(false);
  });

  it('handles file selection correctly', async () => {
    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Create a mock file
    const file = new File(['{"test": "data"}'], 'test.json', { type: 'application/json' });
    
    // Mock the file input change event
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file]
    });
    await input.trigger('change');

    // Check if file is selected
    expect(wrapper.find('p').text()).toContain('test.json');
  });

  it('handles successful import', async () => {
    // Mock successful import
    (dataService.handleFileUpload as jest.Mock).mockResolvedValue(true);
    
    // Mock window.location.reload
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock }
    });

    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Select file
    const file = new File(['{"test": "data"}'], 'test.json', { type: 'application/json' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file]
    });
    await input.trigger('change');

    // Mock alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Click import button
    const importButton = wrapper.find('button.btn-import-export');
    expect(importButton.exists()).toBe(true);
    await importButton.trigger('click');

    // Button should be disabled and show importing text
    expect(importButton.attributes('disabled')).toBeDefined();
    expect(importButton.text()).toBe(Labels.importing);

    // Wait for import to complete
    await flushPromises();

    // Verify import was called
    expect(dataService.handleFileUpload).toHaveBeenCalledWith(file);
    expect(alertMock).toHaveBeenCalledWith('Data imported successfully!');
    expect(reloadMock).toHaveBeenCalled();
  });

  it('handles failed import', async () => {
    // Mock failed import
    (dataService.handleFileUpload as jest.Mock).mockResolvedValue(false);
    
    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Select file
    const file = new File(['{"test": "data"}'], 'test.json', { type: 'application/json' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file]
    });
    await input.trigger('change');

    // Mock alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Click import button
    const importButton = wrapper.find('button.btn-import-export');
    expect(importButton.exists()).toBe(true);
    await importButton.trigger('click');

    // Button should be disabled and show importing text
    expect(importButton.attributes('disabled')).toBeDefined();
    expect(importButton.text()).toBe(Labels.importing);

    // Wait for import to complete
    await flushPromises();

    // Verify error message
    expect(alertMock).toHaveBeenCalledWith('Failed to import data. Please check the file format.');
  });

  it('handles import error', async () => {
    // Mock import error
    (dataService.handleFileUpload as jest.Mock).mockRejectedValue(new Error('Test error'));
    
    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Select file
    const file = new File(['{"test": "data"}'], 'test.json', { type: 'application/json' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file]
    });
    await input.trigger('change');

    // Mock alert and console.error
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Click import button
    const importButton = wrapper.find('button.btn-import-export');
    expect(importButton.exists()).toBe(true);
    await importButton.trigger('click');

    // Button should be disabled and show importing text
    expect(importButton.attributes('disabled')).toBeDefined();
    expect(importButton.text()).toBe(Labels.importing);

    // Wait for import to complete
    await flushPromises();

    // Verify error handling
    expect(consoleErrorMock).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Error importing data: Test error');
  });

  it('handles export functionality', async () => {
    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Mock alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Click export button
    const exportButtons = wrapper.findAll('button.btn-import-export');
    const exportButton = exportButtons.find((button: DOMWrapper<Element>) => button.text() === Labels.exportData);
    if (!exportButton) {
      throw new Error('Export button not found');
    }
    await exportButton.trigger('click');

    // Button should be disabled and show exporting text
    expect(exportButton.attributes('disabled')).toBeDefined();
    expect(exportButton.text()).toBe(Labels.exporting);

    // Wait for export to complete
    await flushPromises();

    // Verify export was called
    expect(dataService.downloadJsonFile).toHaveBeenCalled();
  });

  it('handles export error', async () => {
    // Mock export error
    (dataService.downloadJsonFile as jest.Mock).mockRejectedValue(new Error('Export error'));
    
    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Mock alert and console.error
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Click export button
    const exportButtons = wrapper.findAll('button.btn-import-export');
    const exportButton = exportButtons.find((button: DOMWrapper<Element>) => button.text() === Labels.exportData);
    if (!exportButton) {
      throw new Error('Export button not found');
    }
    await exportButton.trigger('click');

    // Button should be disabled and show exporting text
    expect(exportButton.attributes('disabled')).toBeDefined();
    expect(exportButton.text()).toBe(Labels.exporting);

    // Wait for export to complete
    await flushPromises();

    // Verify error handling
    expect(consoleErrorMock).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Error exporting data');
  });

  it('disables import button while importing', async () => {
    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Select file
    const file = new File(['{"test": "data"}'], 'test.json', { type: 'application/json' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file]
    });
    await input.trigger('change');

    // Mock long-running import
    (dataService.handleFileUpload as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    // Click import button
    const importButtons = wrapper.findAll('button.btn-import-export');
    const importButton = importButtons.find((button: DOMWrapper<Element>) => button.text() === Labels.importData);
    if (!importButton) {
      throw new Error('Import button not found');
    }
    await importButton.trigger('click');

    // Button should be disabled and show importing text
    expect(importButton.attributes('disabled')).toBeDefined();
    expect(importButton.text()).toBe(Labels.importing);

    // Wait for import to complete
    await flushPromises();
  });

  it('disables export button while exporting', async () => {
    // Open modal
    await wrapper.find('.btn').trigger('click');

    // Mock long-running export
    (dataService.downloadJsonFile as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    // Click export button
    const exportButtons = wrapper.findAll('button.btn-import-export');
    const exportButton = exportButtons.find((button: DOMWrapper<Element>) => button.text() === Labels.exportData);
    if (!exportButton) {
      throw new Error('Export button not found');
    }
    await exportButton.trigger('click');

    // Button should be disabled and show exporting text
    expect(exportButton.attributes('disabled')).toBeDefined();
    expect(exportButton.text()).toBe(Labels.exporting);

    // Wait for export to complete
    await flushPromises();
  });
}); 