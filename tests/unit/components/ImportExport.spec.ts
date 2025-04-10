// tests/unit/components/ImportExport.spec.ts
import '@types/jest';
import { mount, flushPromises } from '@vue/test-utils';
import ImportExport from '@/components/ImportExport.vue';
import { dataService } from '@/services/DataService';

// Mock the DataService
jest.mock('@/services/DataService', () => {
  return {
    dataService: {
      handleFileUpload: jest.fn(),
      downloadJsonFile: jest.fn()
    }
  };
});

// Mock window.alert
global.alert = jest.fn();

describe('ImportExport.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal with import and export sections', () => {
    const wrapper = mount(ImportExport);

    // Check modal structure
    expect(wrapper.find('.import-export-component').exists()).toBe(true);
    expect(wrapper.find('.modal-content').exists()).toBe(true);
    expect(wrapper.find('.modal-header').exists()).toBe(true);
    expect(wrapper.find('.modal-body').exists()).toBe(true);

    // Check header
    expect(wrapper.find('.modal-header h2').text()).toBe('Import / Export Data');
    expect(wrapper.find('.modal-close').exists()).toBe(true);

    // Check import section
    expect(wrapper.find('.import-section').exists()).toBe(true);
    expect(wrapper.find('.import-section h3').text()).toBe('Import Data');
    expect(wrapper.find('.warning-text').exists()).toBe(true);
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);

    // Check export section
    expect(wrapper.find('.export-section').exists()).toBe(true);
    expect(wrapper.find('.export-section h3').text()).toBe('Export Data');
    expect(wrapper.find('.export-section button').text()).toBe('Export Data');
  });

  it('closes the modal when close button is clicked', async () => {
    const wrapper = mount(ImportExport);
    
    // Click close button
    await wrapper.find('.modal-close').trigger('click');
    
    // Check if close event is emitted
    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('handles file selection correctly', async () => {
    const wrapper = mount(ImportExport);
    const fileInput = wrapper.find('input[type="file"]');
    
    // Create a mock file
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    
    // Simulate file selection
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false
    });
    
    await fileInput.trigger('change');
    
    // Check if selectedFile is updated
    expect(wrapper.find('p').text()).toContain('Selected: test.json');
    expect(wrapper.find('button[disabled]').exists()).toBe(false);
  });

  it('shows import button only when a file is selected', async () => {
    const wrapper = mount(ImportExport);
    
    // Initially, import button should not be visible
    expect(wrapper.findAll('.import-section button').length).toBe(0);
    
    // Select a file
    const fileInput = wrapper.find('input[type="file"]');
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false
    });
    
    await fileInput.trigger('change');
    
    // Now import button should be visible
    expect(wrapper.findAll('.import-section button').length).toBe(1);
    expect(wrapper.find('.import-section button').text()).toBe('Import Data');
  });

  it('imports data when import button is clicked', async () => {
    // Setup mock for successful import
    (dataService.handleFileUpload as jest.Mock).mockResolvedValue(true);
    
    const wrapper = mount(ImportExport);
    
    // Select a file
    const fileInput = wrapper.find('input[type="file"]');
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false
    });
    
    await fileInput.trigger('change');
    
    // Click import button
    await wrapper.find('.import-section button').trigger('click');
    
    // Wait for the promise to resolve
    await flushPromises();
    
    // Check if handleFileUpload was called
    expect(dataService.handleFileUpload).toHaveBeenCalledWith(file);
    
    // Check if success alert is shown
    expect(global.alert).toHaveBeenCalledWith('Data imported successfully!');
    
    // Check if import-complete event is emitted
    expect(wrapper.emitted()).toHaveProperty('import-complete');
  });

  it('shows error alert when import fails', async () => {
    // Setup mock for failed import
    (dataService.handleFileUpload as jest.Mock).mockResolvedValue(false);
    
    const wrapper = mount(ImportExport);
    
    // Select a file
    const fileInput = wrapper.find('input[type="file"]');
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false
    });
    
    await fileInput.trigger('change');
    
    // Click import button
    await wrapper.find('.import-section button').trigger('click');
    
    // Wait for the promise to resolve
    await flushPromises();
    
    // Check if error alert is shown
    expect(global.alert).toHaveBeenCalledWith('Failed to import data. Please check the file format.');
    
    // Check that import-complete event is not emitted
    expect(wrapper.emitted()).not.toHaveProperty('import-complete');
  });

  it('handles import errors gracefully', async () => {
    // Setup mock to throw an error
    const error = new Error('Test error');
    (dataService.handleFileUpload as jest.Mock).mockRejectedValue(error);
    
    // Mock console.error to avoid cluttering test output
    console.error = jest.fn();
    
    const wrapper = mount(ImportExport);
    
    // Select a file
    const fileInput = wrapper.find('input[type="file"]');
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false
    });
    
    await fileInput.trigger('change');
    
    // Click import button
    await wrapper.find('.import-section button').trigger('click');
    
    // Wait for the promise to resolve
    await flushPromises();
    
    // Check if error is logged
    expect(console.error).toHaveBeenCalled();
    
    // Check if error alert is shown
    expect(global.alert).toHaveBeenCalledWith('Error importing data: Test error');
  });

  it('exports data when export button is clicked', async () => {
    const wrapper = mount(ImportExport);
    
    // Click export button
    await wrapper.find('.export-section button').trigger('click');
    
    // Check if downloadJsonFile was called
    expect(dataService.downloadJsonFile).toHaveBeenCalled();
  });

  it('handles export errors gracefully', async () => {
    // Setup mock to throw an error
    (dataService.downloadJsonFile as jest.Mock).mockImplementation(() => {
      throw new Error('Export error');
    });
    
    // Mock console.error to avoid cluttering test output
    console.error = jest.fn();
    
    const wrapper = mount(ImportExport);
    
    // Click export button
    await wrapper.find('.export-section button').trigger('click');
    
    // Check if error is logged
    expect(console.error).toHaveBeenCalled();
    
    // Check if error alert is shown
    expect(global.alert).toHaveBeenCalledWith('Error exporting data');
  });

  it('shows loading state during import and export', async () => {
    // Setup mock with a delay to simulate loading
    (dataService.handleFileUpload as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(true), 100))
    );
    
    (dataService.downloadJsonFile as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(), 100))
    );
    
    const wrapper = mount(ImportExport);
    
    // Select a file for import
    const fileInput = wrapper.find('input[type="file"]');
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false
    });
    
    await fileInput.trigger('change');
    
    // Start import
    const importPromise = wrapper.find('.import-section button').trigger('click');
    
    // Check if import button shows loading state
    expect(wrapper.find('.import-section button').text()).toBe('Importing...');
    expect(wrapper.find('.import-section button').attributes('disabled')).toBeDefined();
    
    // Wait for import to complete
    await importPromise;
    await flushPromises();
    
    // Start export
    const exportPromise = wrapper.find('.export-section button').trigger('click');
    
    // Check if export button shows loading state
    expect(wrapper.find('.export-section button').text()).toBe('Exporting...');
    expect(wrapper.find('.export-section button').attributes('disabled')).toBeDefined();
    
    // Wait for export to complete
    await exportPromise;
    await flushPromises();
    
    // Check buttons return to normal state
    expect(wrapper.find('.import-section button').text()).toBe('Import Data');
    expect(wrapper.find('.export-section button').text()).toBe('Export Data');
  });

  it('resets file input after successful import', async () => {
    // Setup mock for successful import
    (dataService.handleFileUpload as jest.Mock).mockResolvedValue(true);
    
    const wrapper = mount(ImportExport);
    
    // Set a reference to the file input
    const fileInputRef = wrapper.find('input[type="file"]').element;
    wrapper.vm.$refs.fileInput = fileInputRef;
    
    // Select a file
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    Object.defineProperty(fileInputRef, 'files', {
      value: [file],
      writable: true
    });
    
    // Set the value property
    fileInputRef.value = 'C:\\fakepath\\test.json';
    
    await wrapper.find('input[type="file"]').trigger('change');
    
    // Verify file is selected
    expect(wrapper.find('p').text()).toContain('Selected: test.json');
     
    // Import the file
    await wrapper.find('.import-section button').trigger('click');
    await flushPromises();
    
    // Verify file input is reset
    expect(wrapper.vm.selectedFile).toBeNull();
  });
});