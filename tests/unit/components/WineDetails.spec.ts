import { mount } from '@vue/test-utils';
import WineDetails from '@/components/WineDetails.vue';
import { WineType } from '@/models/WineTastingSheet';
import { createMockWineSheet } from '../../shared/canned/WhineTastingSheetCanned';

describe('WineDetails.vue', () => {
  it('displays no data message when wineSheet prop is null', () => {
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: null
      }
    });

    expect(wrapper.find('.no-data').exists()).toBe(true);
    expect(wrapper.find('.no-data').text()).toContain('No wine tasting sheet data available.');
    expect(wrapper.find('.wine-details').exists()).toBe(false);
  });

  it('renders wine details when wineSheet prop is provided', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    expect(wrapper.find('.no-data').exists()).toBe(false);
    expect(wrapper.find('.wine-details').exists()).toBe(true);
  });

  it('applies correct CSS class based on wine type', () => {
    const mockSheet = createMockWineSheet();
    mockSheet.wineType = WineType.RED;

    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const badge = wrapper.find('.wine-type');
    expect(badge.classes()).toContain('wine-type-red');
    expect(badge.text()).toBe('Rosso');
  });

  it('formats date correctly', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    // Mock Date.toLocaleDateString to return a predictable output
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = function () {
      return '1/1/2023'; // Match the actual format we're getting
    };

    // Find the detail item that contains the date
    const dateDetailItem = wrapper.findAll('.detail-item').find(item =>
      item.find('.detail-label').text() === 'Tasted On'
    );

    // Ensure the element exists before checking its text
    expect(dateDetailItem).toBeTruthy();
    if (dateDetailItem) {
      const dateValue = dateDetailItem.find('.detail-value');
      expect(dateValue.text()).toContain('1/1/2023');
      expect(dateValue.text()).toContain('at 14:30');
    }

    // Restore original method
    Date.prototype.toLocaleDateString = originalToLocaleDateString;
  });

  it('displays all sections correctly', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    // Check section titles
    expect(wrapper.find('.section-title').text()).toBe('Basic Information');
    expect(wrapper.findAll('.section-title')[1].text()).toBe('Visual Examination');
    expect(wrapper.findAll('.section-title')[2].text()).toBe('Olfactory Examination');
    expect(wrapper.findAll('.section-title')[3].text()).toBe('Gustatory Examination');
    expect(wrapper.findAll('.section-title')[4].text()).toBe('Valutazione finale');

    // Check some key values
    expect(wrapper.text()).toContain('Chianti Classico');
    expect(wrapper.text()).toContain('Antinori');
    expect(wrapper.text()).toContain('DOCG');
    expect(wrapper.text()).toContain('2018');
    expect(wrapper.text()).toContain('13.5%');
    expect(wrapper.text()).toContain('18°C');
  });

  it('displays aroma types as tags', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const tags = wrapper.findAll('.tag');
    expect(tags.length).toBe(3);
    expect(tags[0].text()).toBe('Fruttato');
    expect(tags[1].text()).toBe('Legnoso');
    expect(tags[2].text()).toBe('Balsamico');
  });

  it('handles missing final considerations gracefully', () => {
    const mockSheet = createMockWineSheet();
    mockSheet.finalConsiderations = '';
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const considerations = wrapper.find('.consideration-text');
    expect(considerations.text()).toBe('Nessuna considerazione finale.');
  });

  it('displays all gustatory examination subsections', () => {
    const mockSheet = createMockWineSheet();
    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: mockSheet
      }
    });

    const subsectionTitles = wrapper.findAll('.subsection-title');
    expect(subsectionTitles[0].text()).toBe('Structure and Balance');
    expect(subsectionTitles[1].text()).toBe('Soft Elements');
    expect(subsectionTitles[2].text()).toBe('Hard Elements');
    expect(subsectionTitles[3].text()).toBe('Retro-Olfactory');
  });

  it('should display wine details correctly', () => {
    const sheet = createMockWineSheet();
    sheet.wineType = WineType.RED;

    const wrapper = mount(WineDetails, {
      props: {
        wineSheet: sheet
      }
    });

    expect(wrapper.text()).toContain('Rosso');
    expect(wrapper.find('.wine-type').text()).toBe('Rosso');
  });
}); 