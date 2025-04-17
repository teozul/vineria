// tests/unit/components/ImportExport.spec.ts
import { mount, flushPromises } from '@vue/test-utils';
import ImportExport from '@/components/ImportExport.vue';
import { dataService } from '@/services/DataService';

// Define the component instance type
interface ImportExportInstance {
  selectedFile: File | null;
}

// Mock the DataService
jest.mock('@/services/DataService', () => ({
  dataService: {
    handleFileUpload: jest.fn(),
    downloadJsonFile: jest.fn()
  }
}));

// Mock window.alert
const mockAlert = jest.fn();
Object.defineProperty(window, 'alert', {
  value: mockAlert,
  writable: true
});

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
    const vm = wrapper.vm as unknown as ImportExportInstance;
    
    // Create a mock file
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    
    // Get the file input
    const fileInput = wrapper.find('input[type="file"]');
    
    // Set up the files property on the input element
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: true
    });
    
    // Trigger the change event
    await fileInput.trigger('change');
    
    // Verify file is selected
    const selectedFileText = wrapper.find('.import-section p:not(.warning-text)');
    expect(selectedFileText.text()).toContain('Selected: test.json');
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
    expect(mockAlert).toHaveBeenCalledWith('Data imported successfully!');
    
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
    expect(mockAlert).toHaveBeenCalledWith('Failed to import data. Please check the file format.');
    
    // Check that import-complete event is not emitted
    expect(wrapper.emitted()).not.toHaveProperty('import-complete');
  });

  it('handles import errors gracefully', async () => {
    // Setup mock to throw an error
    const error = new Error('Test error');
    (dataService.handleFileUpload as jest.Mock).mockRejectedValue(error);
    
    // Mock console.error to avoid cluttering test output
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    
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
    expect(mockConsoleError).toHaveBeenCalled();
    
    // Check if error alert is shown
    expect(mockAlert).toHaveBeenCalledWith('Error importing data: Test error');
    
    // Restore console.error
    mockConsoleError.mockRestore();
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
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    
    const wrapper = mount(ImportExport);
    
    // Click export button
    await wrapper.find('.export-section button').trigger('click');
    
    // Check if error is logged
    expect(mockConsoleError).toHaveBeenCalled();
    
    // Check if error alert is shown
    expect(mockAlert).toHaveBeenCalledWith('Error exporting data');
    
    // Restore console.error
    mockConsoleError.mockRestore();
  });

  it('shows loading state during import and export', async () => {
    // Setup mock with a delay to simulate loading
    let importResolve: (() => void) | undefined;
    let exportResolve: (() => void) | undefined;
    
    (dataService.handleFileUpload as jest.Mock).mockImplementation(
      () => new Promise<void>(resolve => {
        importResolve = resolve;
      })
    );
    
    (dataService.downloadJsonFile as jest.Mock).mockImplementation(
      () => new Promise<void>(resolve => {
        exportResolve = resolve;
      })
    );
    
    const wrapper = mount(ImportExport);
    
    // Select a file for import
    const fileInput = wrapper.find('input[type="file"]');
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: true
    });
    
    await fileInput.trigger('change');
    
    // Start import
    const importButton = wrapper.find('.import-section button');
    await importButton.trigger('click');
    
    // Wait for the next tick to allow the component to update
    await wrapper.vm.$nextTick();
    
    // Check if import button shows loading state
    expect(importButton.text()).toBe('Importing...');
    expect(importButton.attributes('disabled')).toBeDefined();
    
    // Resolve the import promise
    if (importResolve) {
      importResolve();
      await flushPromises();
      
      // Check import button returned to normal state
      expect(importButton.text()).toBe('Import Data');
    }
    
    // Start export
    const exportButton = wrapper.find('.export-section button');
    await exportButton.trigger('click');
    
    // Wait for the next tick to allow the component to update
    await wrapper.vm.$nextTick();
    
    // Check if export button shows loading state
    expect(exportButton.text()).toBe('Exporting...');
    expect(exportButton.attributes('disabled')).toBeDefined();
    
    // Resolve the export promise
    if (exportResolve) {
      exportResolve();
      await flushPromises();
      
      // Check export button returned to normal state
      expect(exportButton.text()).toBe('Export Data');
    }
  });

  it('resets file input after successful import', async () => {
    // Setup mock for successful import
    (dataService.handleFileUpload as jest.Mock).mockResolvedValue(true);
    
    const wrapper = mount(ImportExport);
    const vm = wrapper.vm as unknown as ImportExportInstance;
    
    // Get the file input
    const fileInput = wrapper.find('input[type="file"]');
    
    // Create a mock file
    const file = new File(['test data'], 'test.json', { type: 'application/json' });
    
    // Simulate file selection
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: true
    });
    
    // Trigger the change event
    await fileInput.trigger('change');
    
    // Verify file is selected by checking the specific paragraph that shows the selected file
    const selectedFileText = wrapper.find('.import-section p:not(.warning-text)');
    expect(selectedFileText.text()).toContain('Selected: test.json');
     
    // Import the file
    await wrapper.find('.import-section button').trigger('click');
    await flushPromises();
    
    // Verify file input is reset
    expect(vm.selectedFile).toBeNull();
  });
});