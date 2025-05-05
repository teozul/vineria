import { mount } from '@vue/test-utils';
import WineCard from '@/components/WineCard.vue';
import { dataService } from '@/services/DataService';
import ShowWinesView from '@/views/ShowWinesView.vue';
import { createMockWineSheets } from '../../shared/canned/WhineTastingSheetCanned';


// Mock the dataService
jest.mock('@/services/DataService', () => ({
    dataService: {
        getAllSheets: jest.fn(),
        deleteSheet: jest.fn(),
        searchSheets: jest.fn()
    }
}));

describe('WineList.vue', () => {
    const mockWineSheets = createMockWineSheets()

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders wine list with WineCard components', async () => {
        // Setup the mock return value
        (dataService.getAllSheets as jest.Mock).mockResolvedValue(mockWineSheets);

        // Mount the component
        const wrapper = mount(ShowWinesView, {
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            },
        });

        await wrapper.vm.$nextTick();
        // For more reliable results, await a small delay
        await new Promise(resolve => setTimeout(resolve, 0));

        // Now we can check if the WineCard components are rendered
        const cards = wrapper.findAllComponents(WineCard);
        expect(cards.length).toBe(mockWineSheets.length);
    });

    it('shows loading state initially', () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([]);
        const wrapper = mount(ShowWinesView, {
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            }
        });

        expect(wrapper.find('.loading-indicator').exists()).toBe(true);
    });

    it('shows empty state when no wine sheets exist', async () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([]);

        const wrapper = mount(ShowWinesView, {
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            },
        });
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(wrapper.find('.empty-state').exists()).toBe(true);
        expect(wrapper.find('.wine-list').exists()).toBe(false);
    });

    it('deletes a wine sheet when delete event is emitted', async () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([...mockWineSheets]);
        (dataService.deleteSheet as jest.Mock).mockResolvedValue(true);

        const wrapper = mount(ShowWinesView, {
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            },
        });
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));

        // Get the first WineCard and emit the delete event
        const firstCard = wrapper.findComponent(WineCard);
        firstCard.vm.$emit('delete', '1');

        // Wait for the delete operation to complete
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));

        // Check if the dataService.deleteSheet was called with the correct ID
        expect(dataService.deleteSheet).toHaveBeenCalledWith('1');

        // Check if the wine sheet was removed from the list
        // After deletion there should be one less wine card
        const cards = wrapper.findAllComponents(WineCard);
        expect(cards.length).toBe(mockWineSheets.length - 1);
    });

    it('filters wine sheets based on search input', async () => {
        const mockWineSheets = [
            { id: '1', denomination: 'Barolo', producer: 'Producer A' },
            { id: '2', denomination: 'Chianti', producer: 'Producer B' }
        ];
        (dataService.getAllSheets as jest.Mock).mockResolvedValue(mockWineSheets);
        (dataService.searchSheets as jest.Mock).mockResolvedValue([mockWineSheets[1]]);

        const wrapper = mount(ShowWinesView, {
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            },
        });
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));

        // Simulate typing in the search input
        const input = wrapper.find('input[type="text"]');
        await input.setValue('Chianti');
        await input.trigger('input');
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));

        // Should call searchSheets with the query
        expect(dataService.searchSheets).toHaveBeenCalledWith('Chianti');
        // Should only show the filtered result
        const cards = wrapper.findAllComponents(WineCard);
        expect(cards.length).toBe(1);
        const wineSheet = cards[0].props('wineSheet');
        expect(wineSheet).toBeDefined();
        expect((wineSheet as any).denomination).toBe('Chianti');
    });

    it('shows no results message when search yields nothing', async () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([{ id: '1', denomination: 'Barolo', producer: 'Producer A' }]);
        (dataService.searchSheets as jest.Mock).mockResolvedValue([]);

        const wrapper = mount(ShowWinesView, {
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            },
        });
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));

        // Simulate typing in the search input
        const input = wrapper.find('input[type="text"]');
        await input.setValue('Nonexistent');
        await input.trigger('input');
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 0));

        // Should call searchSheets with the query
        expect(dataService.searchSheets).toHaveBeenCalledWith('Nonexistent');
        // Should show the no results message
        expect(wrapper.html()).toContain('Nessun risultato trovato per la ricerca');
    });
});