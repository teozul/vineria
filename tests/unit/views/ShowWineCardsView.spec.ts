import { mount } from '@vue/test-utils';
import WineCard from '@/components/WineCard.vue';
import { dataService } from '@/services/DataService';
import ShowWineCardsView from '@/views/ShowWineCardsView.vue';
import { createMockWineSheets } from '../../shared/canned/WhineTastingSheetCanned';


// Mock the dataService
jest.mock('@/services/DataService', () => ({
    dataService: {
        getAllSheets: jest.fn(),
        deleteSheet: jest.fn()
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
        const wrapper = mount(ShowWineCardsView, {
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
        const wrapper = mount(ShowWineCardsView, {
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

        const wrapper = mount(ShowWineCardsView, {
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

        const wrapper = mount(ShowWineCardsView, {
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
});