// tests/integration/WineTastingFlow.spec.ts

import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { dataService } from '@/services/DataService';
import { createEmptyWineTastingSheet } from '@/models/WineTastingSheet';
import { ComponentPublicInstance, defineComponent } from 'vue';

// You would import your main views here
// For this test, we'll mock them to avoid having to import the entire app
const HomeView = defineComponent({
  template: `
    <div class="home-view">
      <h1>Wine Tasting Sheets</h1>
      <button class="create-button" @click="$router.push('/create')">Create New</button>
      <div class="wine-list">
        <div v-for="sheet in sheets" :key="sheet.id" class="wine-item">
          {{ sheet.denomination }} ({{ sheet.producer }})
          <button @click="$router.push('/edit/' + sheet.id)">Edit</button>
          <button @click="$router.push('/view/' + sheet.id)">View</button>
          <button @click="deleteSheet(sheet.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  props: {
    sheets: {
      type: Array,
      default: () => []
    }
  },
  setup(props: { sheets: any[] }, { emit }: { emit: (event: string) => void }) {
    const deleteSheet = async (id: string) => {
      await dataService.deleteSheet(id);
      emit('refresh');
    };
    
    return { deleteSheet };
  }
});

const CreateWineView = defineComponent({
  template: `
    <div class="create-view">
      <h1>Create Wine Tasting Sheet</h1>
      <form @submit.prevent="saveSheet">
        <input v-model="sheet.denomination" placeholder="Denomination" />
        <input v-model="sheet.producer" placeholder="Producer" />
        <select v-model="sheet.wineType">
          <option value="Rosso">Rosso</option>
          <option value="Bianco">Bianco</option>
          <option value="Rosé">Rosé</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" @click="$router.push('/')">Cancel</button>
      </form>
    </div>
  `,
  data() {
    return {
      sheet: createEmptyWineTastingSheet()
    };
  },
  methods: {
    async saveSheet(this: any) {
      await dataService.createSheet(this.sheet);
      this.$router.push('/');
    }
  }
});

const EditWineView = defineComponent({
  template: `
    <div class="edit-view">
      <h1>Edit Wine Tasting Sheet</h1>
      <form v-if="sheet" @submit.prevent="updateSheet">
        <input v-model="sheet.denomination" placeholder="Denomination" />
        <input v-model="sheet.producer" placeholder="Producer" />
        <select v-model="sheet.wineType">
          <option value="Rosso">Rosso</option>
          <option value="Bianco">Bianco</option>
          <option value="Rosé">Rosé</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" @click="$router.push('/')">Cancel</button>
      </form>
      <div v-else>Loading...</div>
    </div>
  `,
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sheet: null
    };
  },
  async created(this: any) {
    this.sheet = await dataService.getSheetById(this.id);
  },
  methods: {
    async updateSheet(this: any) {
      await dataService.updateSheet(this.sheet);
      this.$router.push('/');
    }
  }
});

const ViewWineView = defineComponent({
  template: `
    <div class="view-view">
      <h1>View Wine Tasting Sheet</h1>
      <div v-if="sheet" class="sheet-details">
        <h2>{{ sheet.denomination }}</h2>
        <p>Producer: {{ sheet.producer }}</p>
        <p>Type: {{ sheet.wineType }}</p>
        <button @click="$router.push('/')">Back to List</button>
        <button @click="$router.push('/edit/' + sheet.id)">Edit</button>
      </div>
      <div v-else>Loading...</div>
    </div>
  `,
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sheet: null
    };
  },
  async created(this: any) {
    this.sheet = await dataService.getSheetById(this.id);
  }
});

// Mock the dataService methods
jest.mock('@/services/DataService', () => {
  const mockSheets: any[] = [];
  
  return {
    dataService: {
      getAllSheets: jest.fn(() => Promise.resolve([...mockSheets])),
      getSheetById: jest.fn((id: string) => {
        const sheet = mockSheets.find(s => s.id === id);
        return Promise.resolve(sheet ? { ...sheet } : null);
      }),
      createSheet: jest.fn((sheetData) => {
        const newSheet = {
          ...createEmptyWineTastingSheet(),
          ...sheetData
        };
        mockSheets.push(newSheet);
        return Promise.resolve({ ...newSheet });
      }),
      updateSheet: jest.fn((sheet) => {
        const index = mockSheets.findIndex(s => s.id === sheet.id);
        if (index >= 0) {
          mockSheets[index] = { ...sheet };
          return Promise.resolve({ ...sheet });
        }
        return Promise.reject(new Error('Sheet not found'));
      }),
      deleteSheet: jest.fn((id: string) => {
        const index = mockSheets.findIndex(s => s.id === id);
        if (index >= 0) {
          mockSheets.splice(index, 1);
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      })
    }
  };
});

describe('Wine Tasting Flow', () => {
  let router: Router;
  let app: any;
  
  beforeEach(() => {
    // Reset the dataService mocks
    jest.clearAllMocks();
    
    // Create a router with our mock components
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: HomeView, props: true },
        { path: '/create', component: CreateWineView },
        { path: '/edit/:id', component: EditWineView, props: true },
        { path: '/view/:id', component: ViewWineView, props: true }
      ]
    });
    
    // Create a wrapper app component that will use our router
    app = {
      template: `
        <div class="app">
          <router-view :sheets="sheets" @refresh="loadSheets"></router-view>
        </div>
      `,
      data() {
        return {
          sheets: [] as any[]
        };
      },
      async created() {
        await this.loadSheets();
      },
      methods: {
        async loadSheets(this: any) {
          this.sheets = await dataService.getAllSheets();
        }
      }
    };
  });
  
  it('allows creating, editing, viewing, and deleting a wine tasting sheet', async () => {
    // Mount the app with router
    const wrapper = mount(app, {
      global: {
        plugins: [router]
      }
    }) as VueWrapper<ComponentPublicInstance & { loadSheets: () => Promise<void> }>;
    
    // Wait for initial data loading
    await flushPromises();
    
    // Initial state should show empty wine list
    expect(wrapper.find('.home-view').exists()).toBe(true);
    expect(wrapper.findAll('.wine-item').length).toBe(0);
    
    // Navigate to create page
    await wrapper.find('.create-button').trigger('click');
    await router.isReady();
    
    // Should be on create page
    expect(wrapper.find('.create-view').exists()).toBe(true);
    
    // Fill out the form
    await wrapper.find('input[placeholder="Denomination"]').setValue('Barolo');
    await wrapper.find('input[placeholder="Producer"]').setValue('Test Producer');
    
    // Submit the form
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    
    // Should have navigated back to home
    expect(wrapper.find('.home-view').exists()).toBe(true);
    
    // Should have called createSheet
    expect(dataService.createSheet).toHaveBeenCalledTimes(1);
    expect(dataService.createSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        denomination: 'Barolo',
        producer: 'Test Producer'
      })
    );
    
    // Should show the new sheet in the list
    await flushPromises();
    expect(wrapper.findAll('.wine-item').length).toBe(1);
    expect(wrapper.find('.wine-item').text()).toContain('Barolo');
    expect(wrapper.find('.wine-item').text()).toContain('Test Producer');
    
    // Get the ID of the first sheet
    const sheets = await dataService.getAllSheets();
    const sheetId = sheets[0].id;
    
    // Navigate to view page
    await wrapper.find('.wine-item button:nth-child(2)').trigger('click'); // View button
    await router.isReady();
    
    // Should be on view page
    expect(wrapper.find('.view-view').exists()).toBe(true);
    
    // Should show the sheet details
    await flushPromises();
    expect(wrapper.find('.sheet-details h2').text()).toBe('Barolo');
    expect(wrapper.find('.sheet-details').text()).toContain('Producer: Test Producer');
    
    // Navigate to edit page
    await wrapper.find('.sheet-details button:nth-child(2)').trigger('click'); // Edit button
    await router.isReady();
    
    // Should be on edit page
    expect(wrapper.find('.edit-view').exists()).toBe(true);
    
    // Form should be pre-filled
    await flushPromises();
    expect((wrapper.find('input[placeholder="Denomination"]').element as HTMLInputElement).value).toBe('Barolo');
    expect((wrapper.find('input[placeholder="Producer"]').element as HTMLInputElement).value).toBe('Test Producer');
    
    // Update the form
    await wrapper.find('input[placeholder="Denomination"]').setValue('Barolo Riserva');
    await wrapper.find('input[placeholder="Producer"]').setValue('Updated Producer');
    
    // Submit the form
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    
    // Should have navigated back to home
    expect(wrapper.find('.home-view').exists()).toBe(true);
    
    // Should have called updateSheet
    expect(dataService.updateSheet).toHaveBeenCalledTimes(1);
    expect(dataService.updateSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        id: sheetId,
        denomination: 'Barolo Riserva',
        producer: 'Updated Producer'
      })
    );
    
    // Should show the updated sheet in the list
    await flushPromises();
    expect(wrapper.findAll('.wine-item').length).toBe(1);
    expect(wrapper.find('.wine-item').text()).toContain('Barolo Riserva');
    expect(wrapper.find('.wine-item').text()).toContain('Updated Producer');
    
    // Delete the sheet
    await wrapper.find('.wine-item button:nth-child(3)').trigger('click'); // Delete button
    await flushPromises();
    
    // Should have called deleteSheet
    expect(dataService.deleteSheet).toHaveBeenCalledTimes(1);
    expect(dataService.deleteSheet).toHaveBeenCalledWith(sheetId);
    
    // List should be empty again
    await flushPromises();
    expect(wrapper.findAll('.wine-item').length).toBe(0);
  });
  
  it('handles navigation between views correctly', async () => {
    const wrapper = mount(app, {
      global: {
        plugins: [router]
      }
    }) as VueWrapper<ComponentPublicInstance & { loadSheets: () => Promise<void> }>;
    
    // Wait for initial data loading
    await flushPromises();
    
    // Start at home
    expect(wrapper.find('.home-view').exists()).toBe(true);
    
    // Navigate to create
    await wrapper.find('.create-button').trigger('click');
    await router.isReady();
    expect(wrapper.find('.create-view').exists()).toBe(true);
    
    // Cancel creation and go back to home
    await wrapper.find('button[type="button"]').trigger('click'); // Cancel button
    await router.isReady();
    expect(wrapper.find('.home-view').exists()).toBe(true);
    
    // Create a sheet for testing navigation
    const testSheet = createEmptyWineTastingSheet();
    testSheet.denomination = 'Navigation Test';
    testSheet.producer = 'Test Navigation';
    await dataService.createSheet(testSheet);
    await flushPromises();
    
    // Reload the sheets
    const loadSheetsSpy = jest.spyOn(wrapper.vm, 'loadSheets');
    await wrapper.vm.loadSheets();
    expect(loadSheetsSpy).toHaveBeenCalled();
    
    // List should show the created sheet
    await flushPromises();
    expect(wrapper.findAll('.wine-item').length).toBe(1);
    
    // Get the ID of the sheet
    const sheets = await dataService.getAllSheets();
    const sheetId = sheets[0].id;
    
    // Navigate from home to edit directly
    await wrapper.find('.wine-item button:nth-child(1)').trigger('click'); // Edit button
    await router.isReady();
    expect(wrapper.find('.edit-view').exists()).toBe(true);
    
    // Navigate back to home from edit
    await wrapper.find('button[type="button"]').trigger('click'); // Cancel button
    await router.isReady();
    expect(wrapper.find('.home-view').exists()).toBe(true);
    
    // Navigate from home to view
    await wrapper.find('.wine-item button:nth-child(2)').trigger('click'); // View button
    await router.isReady();
    expect(wrapper.find('.view-view').exists()).toBe(true);
    
    // Navigate from view to edit
    await flushPromises();
    await wrapper.find('.sheet-details button:nth-child(2)').trigger('click'); // Edit button
    await router.isReady();
    expect(wrapper.find('.edit-view').exists()).toBe(true);
    
    // Navigate from edit to home
    await wrapper.find('button[type="button"]').trigger('click'); // Cancel button
    await router.isReady();
    expect(wrapper.find('.home-view').exists()).toBe(true);
    
    // Navigate from home to view
    await wrapper.find('.wine-item button:nth-child(2)').trigger('click'); // View button
    await router.isReady();
    expect(wrapper.find('.view-view').exists()).toBe(true);
    
    // Navigate from view back to home
    await flushPromises();
    await wrapper.find('.sheet-details button:nth-child(1)').trigger('click'); // Back to List button
    await router.isReady();
    expect(wrapper.find('.home-view').exists()).toBe(true);
  });
  
  it('handles errors gracefully', async () => {
    // Mock console.error to avoid cluttering test output
    console.error = jest.fn();
    
    // Mock getSheetById to fail once
    const originalGetById = dataService.getSheetById;
    dataService.getSheetById = jest.fn()
      .mockRejectedValueOnce(new Error('Failed to fetch sheet'))
      .mockImplementation(originalGetById);
    
    const wrapper = mount(app, {
      global: {
        plugins: [router]
      }
    }) as VueWrapper<ComponentPublicInstance & { loadSheets: () => Promise<void> }>;
    
    // Wait for initial data loading
    await flushPromises();
    
    // Create a test sheet
    const testSheet = createEmptyWineTastingSheet();
    testSheet.denomination = 'Error Test';
    await dataService.createSheet(testSheet);
    await flushPromises();
    
    // Reload the sheets to display the new one
    await wrapper.vm.loadSheets();
    await flushPromises();
    
    // Get the ID of the sheet
    const sheets = await dataService.getAllSheets();
    const sheetId = sheets[0].id;
    
    // Try to view the sheet (this should trigger the error)
    await wrapper.find('.wine-item button:nth-child(2)').trigger('click'); // View button
    await router.isReady();
    await flushPromises();
    
    // Should still be on the view page but with no data loaded
    expect(wrapper.find('.view-view').exists()).toBe(true);
    expect(wrapper.find('.sheet-details').exists()).toBe(false);
    expect(wrapper.text()).toContain('Loading');
    
    // Error should have been logged
    expect(console.error).toHaveBeenCalled();
    
    // Navigate back to home
    await router.push('/');
    await router.isReady();
    
    // Reset the mock
    dataService.getSheetById = originalGetById;
    
    // Try viewing again, this time it should succeed
    await wrapper.find('.wine-item button:nth-child(2)').trigger('click'); // View button
    await router.isReady();
    await flushPromises();
    
    // Should show data
    expect(wrapper.find('.sheet-details').exists()).toBe(true);
    expect(wrapper.find('.sheet-details h2').text()).toBe('Error Test');
  });
});