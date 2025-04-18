import { mount } from '@vue/test-utils';
import WineForm from '../WineForm.vue';
import { createEmptyWineTastingSheet, WineTastingSheet } from '@/models/WineTastingSheet';
import { nextTick } from 'vue';

describe('WineForm', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(WineForm);
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes with empty wine sheet when no prop is provided', () => {
    const wrapper = mount(WineForm);
    const emptySheet = createEmptyWineTastingSheet();
    expect(wrapper.vm.localWineSheet).toEqual(emptySheet);
  });

  it('initializes with provided wine sheet data', () => {
    const testSheet = createEmptyWineTastingSheet();
    testSheet.producer = 'Test Producer';
    testSheet.vintage = 2020;
    
    const wrapper = mount(WineForm, {
      props: {
        wineSheet: testSheet
      }
    });
    
    expect(wrapper.vm.localWineSheet.producer).toBe('Test Producer');
    expect(wrapper.vm.localWineSheet.vintage).toBe(2020);
  });

  it('emits save event with form data when submitted', async () => {
    const wrapper = mount(WineForm);
    const form = wrapper.find('form');
    
    // Fill in some test data
    await wrapper.find('#producer').setValue('Test Producer');
    await wrapper.find('#vintage').setValue('2020');
    await wrapper.find('#wineType').setValue('Rosso');
    
    await form.trigger('submit');
    
    expect(wrapper.emitted('save')).toBeTruthy();
    const emittedData = wrapper.emitted('save')![0][0] as WineTastingSheet;
    expect(emittedData.producer).toBe('Test Producer');
    expect(emittedData.vintage).toBe(2020);
    expect(emittedData.wineType).toBe('Rosso');
  });

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(WineForm);
    const cancelButton = wrapper.find('.btn-secondary');
    
    await cancelButton.trigger('click');
    
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('shows/hides sparkling wine fields based on checkbox', async () => {
    const wrapper = mount(WineForm);
    const checkbox = wrapper.find('#isSparklingWine');
    
    // Initially should not show sparkling wine fields
    expect(wrapper.find('#effervescenceGrain').exists()).toBe(false);
    expect(wrapper.find('#effervescencePersistence').exists()).toBe(false);
    
    // Check the box
    await checkbox.setValue(true);
    await nextTick();
    
    // Should now show sparkling wine fields
    expect(wrapper.find('#effervescenceGrain').exists()).toBe(true);
    expect(wrapper.find('#effervescencePersistence').exists()).toBe(true);
    
    // Uncheck the box
    await checkbox.setValue(false);
    await nextTick();
    
    // Fields should be hidden again
    expect(wrapper.find('#effervescenceGrain').exists()).toBe(false);
    expect(wrapper.find('#effervescencePersistence').exists()).toBe(false);
  });

  it('updates color tone options based on wine type', async () => {
    const wrapper = mount(WineForm);
    const wineTypeSelect = wrapper.find('#wineType');
    
    // Test for Rosso
    await wineTypeSelect.setValue('Rosso');
    await nextTick();
    const colorToneOptions = wrapper.vm.getColorToneOptions();
    expect(Object.values(colorToneOptions)).toContain('PurpleRed');
    expect(Object.values(colorToneOptions)).toContain('RubyRed');
    
    // Test for Bianco
    await wineTypeSelect.setValue('Bianco');
    await nextTick();
    const whiteColorToneOptions = wrapper.vm.getColorToneOptions();
    expect(Object.values(whiteColorToneOptions)).toContain('StrawYellow');
    expect(Object.values(whiteColorToneOptions)).toContain('GoldenYellow');
    
    // Test for Rosé
    await wineTypeSelect.setValue('Rosé');
    await nextTick();
    const roseColorToneOptions = wrapper.vm.getColorToneOptions();
    expect(Object.values(roseColorToneOptions)).toContain('CherryPink');
    expect(Object.values(roseColorToneOptions)).toContain('LightPink');
  });

  it('handles aroma type selection', async () => {
    const wrapper = mount(WineForm);
    const aromaCheckboxes = wrapper.findAll('.aroma-options input[type="checkbox"]');
    
    // Select first aroma type
    await aromaCheckboxes[0].setValue(true);
    await nextTick();
    
    expect(wrapper.vm.selectedAromaTypes).toContain(wrapper.vm.aromaTypeOptions[0]);
    
    // Unselect the aroma type
    await aromaCheckboxes[0].setValue(false);
    await nextTick();
    
    expect(wrapper.vm.selectedAromaTypes).not.toContain(wrapper.vm.aromaTypeOptions[0]);
  });

  it('shows submitting state during form submission', async () => {
    const wrapper = mount(WineForm);
    const submitButton = wrapper.find('button[type="submit"]');
    
    // Initially not submitting
    expect(wrapper.vm.submitting).toBe(false);
    expect(submitButton.text()).toContain('Save Wine Tasting Sheet');
    
    // Trigger submission
    await wrapper.find('form').trigger('submit');
    await nextTick();
    
    // Should show submitting state
    expect(wrapper.vm.submitting).toBe(true);
    expect(submitButton.text()).toContain('Saving...');
  });
}); 