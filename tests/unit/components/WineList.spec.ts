// tests/unit/components/WineList.spec.ts
import { mount } from '@vue/test-utils';
import WineList from '@/components/WineList.vue';
import { WineTastingSheet, createEmptyWineTastingSheet } from '@/models/WineTastingSheet';

describe('WineList.vue', () => {
  // Helper function to create sample wine sheets
  const createMockWineSheets = (): WineTastingSheet[] => {
    const sheet1 = createEmptyWineTastingSheet();
    sheet1.id = '1';
    sheet1.denomination = 'Chianti Classico';
    sheet1.producer = 'Producer 1';
    sheet1.vintage = 2018;
    sheet1.wineType = 'Rosso';
    sheet1.classification = 'DOCG';
    sheet1.date = '2023-01-01';

    const sheet2 = createEmptyWineTastingSheet();
    sheet2.id = '2';
    sheet2.denomination = 'Vermentino';
    sheet2.producer = 'Producer 2';
    sheet2.vintage = 2020;
    sheet2.wineType = 'Bianco';
    sheet2.classification = 'DOC';
    sheet2.date = '2023-02-15';

    const sheet3 = createEmptyWineTastingSheet();
    sheet3.id = '3';
    sheet3.denomination = 'Cerasuolo';
    sheet3.producer = 'Producer 3';
    sheet3.vintage = 2021;
    sheet3.wineType = 'Rosé';
    sheet3.classification = 'DOC';
    sheet3.date = '2023-03-20';

    return [sheet1, sheet2, sheet3];
  };

  it('displays loading state when loading prop is true', () => {
    const wrapper = mount(WineList, {
      props: {
        sheets: [],
        loading: true
      }
    });

    expect(wrapper.find('.loading-state').exists()).toBe(true);
    expect(wrapper.find('.loading-state').text()).toContain('Loading wine tasting sheets...');
    expect(wrapper.find('.empty-state').exists()).toBe(false);
    expect(wrapper.find('.wine-sheets-grid').exists()).toBe(false);
  });

  it('displays empty state when no sheets are available', () => {
    const wrapper = mount(WineList, {
      props: {
        sheets: [],
        loading: false
      }
    });

    expect(wrapper.find('.loading-state').exists()).toBe(false);
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.find('.empty-state').text()).toContain('No wine tasting sheets available.');
    expect(wrapper.find('.wine-sheets-grid').exists()).toBe(false);
  });

  it('renders empty-action slot when no sheets are available', () => {
    const wrapper = mount(WineList, {
      props: {
        sheets: [],
        loading: false
      },
      slots: {
        'empty-action': '<button>Create New</button>'
      }
    });

    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.find('.empty-state button').exists()).toBe(true);
    expect(wrapper.find('.empty-state button').text()).toBe('Create New');
  });

  it('renders wine sheets when available', () => {
    const mockSheets = createMockWineSheets();
    
    const wrapper = mount(WineList, {
      props: {
        sheets: mockSheets,
        loading: false
      }
    });

    expect(wrapper.find('.loading-state').exists()).toBe(false);
    expect(wrapper.find('.empty-state').exists()).toBe(false);
    expect(wrapper.find('.wine-sheets-grid').exists()).toBe(true);

    // Check if all sheets are rendered
    const wineCards = wrapper.findAll('.wine-card');
    expect(wineCards.length).toBe(3);

    // Check first card details
    expect(wineCards[0].find('h3').text()).toBe('Chianti Classico');
    expect(wineCards[0].find('.wine-type').text().trim()).toBe('Rosso');
    expect(wineCards[0].find('.wine-card-details').text()).toContain('Producer: Producer 1');
    expect(wineCards[0].find('.wine-card-details').text()).toContain('Vintage: 2018');
    expect(wineCards[0].find('.wine-card-details').text()).toContain('Classification: DOCG');
  });

  it('applies correct CSS class based on wine type', () => {
    const mockSheets = createMockWineSheets();
    
    const wrapper = mount(WineList, {
      props: {
        sheets: mockSheets,
        loading: false
      }
    });

    const wineTypes = wrapper.findAll('.wine-type');
    
    // Check classes for each wine type
    expect(wineTypes[0].classes()).toContain('wine-type-red');
    expect(wineTypes[1].classes()).toContain('wine-type-white');
    expect(wineTypes[2].classes()).toContain('wine-type-rose');
  });

  it('formats dates correctly', () => {
    const mockSheets = createMockWineSheets();
    
    // Mock Date.toLocaleDateString to return a predictable output
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = function() {
      if (this.toISOString().includes('2023-01-01')) return '01/01/2023';
      if (this.toISOString().includes('2023-02-15')) return '02/15/2023';
      if (this.toISOString().includes('2023-03-20')) return '03/20/2023';
      return 'unknown date';
    };
    
    const wrapper = mount(WineList, {
      props: {
        sheets: mockSheets,
        loading: false
      }
    });

    const wineCards = wrapper.findAll('.wine-card');
    
    // Check dates on each card
    expect(wineCards[0].find('.wine-card-details').text()).toContain('Tasted on: 01/01/2023');
    expect(wineCards[1].find('.wine-card-details').text()).toContain('Tasted on: 02/15/2023');
    expect(wineCards[2].find('.wine-card-details').text()).toContain('Tasted on: 03/20/2023');
    
    // Restore original method
    Date.prototype.toLocaleDateString = originalToLocaleDateString;
  });

  it('renders item-actions slot for each wine sheet', () => {
    const mockSheets = createMockWineSheets();
    
    const wrapper = mount(WineList, {
      props: {
        sheets: mockSheets,
        loading: false
      },
      slots: {
        'item-actions': `<template #item-actions="{ sheet }">
          <button class="view-btn">View</button>
          <button class="edit-btn" :data-id="sheet.id">Edit</button>
        </template>`
      }
    });

    const actionButtons = wrapper.findAll('.wine-card-actions');
    
    // Check if slot content is rendered for each card
    expect(actionButtons.length).toBe(3);
    actionButtons.forEach(actionButton => {
      expect(actionButton.find('.view-btn').exists()).toBe(true);
      expect(actionButton.find('.edit-btn').exists()).toBe(true);
    });
    
    // Check if data binding works in slots
    const editButtons = wrapper.findAll('.edit-btn');
    expect(editButtons[0].attributes('data-id')).toBe('1');
    expect(editButtons[1].attributes('data-id')).toBe('2');
    expect(editButtons[2].attributes('data-id')).toBe('3');
  });

  it('handles invalid date gracefully', () => {
    const mockSheet = createEmptyWineTastingSheet();
    mockSheet.date = 'invalid-date';
    
    const wrapper = mount(WineList, {
      props: {
        sheets: [mockSheet],
        loading: false
      }
    });

    const wineCard = wrapper.find('.wine-card');
    
    // Should just display the original string if date is invalid
    expect(wineCard.find('.wine-card-details').text()).toContain('Tasted on: Invalid Date');
  });

  it('applies responsive layout for mobile', () => {
    // This is a bit tricky to test with Jest since it relies on CSS media queries
    // However, we can verify the component has the classes that will be styled responsively
    
    const mockSheets = createMockWineSheets();
    
    const wrapper = mount(WineList, {
      props: {
        sheets: mockSheets,
        loading: false
      }
    });

    expect(wrapper.find('.wine-sheets-grid').exists()).toBe(true);
    
    // Verify wine cards have the necessary classes for responsive styling
    const wineCards = wrapper.findAll('.wine-card');
    wineCards.forEach(card => {
      expect(card.classes()).toContain('wine-card');
      expect(card.find('.wine-card-header').exists()).toBe(true);
      expect(card.find('.wine-card-details').exists()).toBe(true);
      expect(card.find('.wine-card-actions').exists()).toBe(true);
    });
  });
});