import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { mount } from '@vue/test-utils';
import ShowWineCardsView from '@/views/ShowWineCardsView.vue';
import WineCard from '@/components/WineCard.vue';
import { dataService } from '@/services/DataService';
import { useRouter } from 'vue-router';
import { createMockWineSheet, createMockWineSheets } from '../../shared/canned/WhineTastingSheetCanned';

jest.mock('@/services/DataService', () => ({
    dataService: {
        getAllSheets: jest.fn(),
        deleteSheet: jest.fn(() => Promise.resolve(true)),
    },
}));

jest.mock('vue-router', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

const mockWineSheets = createMockWineSheets()

describe('ShowWineCardsView', () => {
    let wrapper: ReturnType<typeof mount>;

    beforeEach(() => {
        jest.clearAllMocks();
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([]);
        wrapper = mount(ShowWineCardsView, {
            global: {
                components: {
                    WineCard,
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>'
                    },
                },
            },
        });
    });

    it('renders loading initially', () => {
        expect(wrapper.find('.loading-indicator').exists()).toBe(true);
    });

    it('renders empty state if no data', async () => {
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.empty-state').exists()).toBe(true);
        expect(wrapper.find('.empty-state .btn[href="/create"]').exists()).toBe(true);
    });

    it('renders wine list with WineCard components', async () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue(mockWineSheets);
        await wrapper.vm.$nextTick();
        expect(wrapper.findAllComponents(WineCard).length).toBe(mockWineSheets.length);
    });

    it('calls deleteSheet and updates list on WineCard delete', async () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([...mockWineSheets]);
        await wrapper.vm.$nextTick();

        const firstCard = wrapper.findComponent(WineCard);
        await firstCard.vm.$emit('delete', '1');

        expect(dataService.deleteSheet).toHaveBeenCalledWith('1');
        expect((wrapper.vm as any).wineSheets.value.length).toBe(1); // Ora dovrebbe funzionare
        expect((wrapper.vm as any).wineSheets.value[0].id).toBe('2'); // Ora dovrebbe funzionare
    });

    it('handles failed delete', async () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([...mockWineSheets]);
        (dataService.deleteSheet as jest.Mock).mockResolvedValue(false);
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
        await wrapper.vm.$nextTick();
        await wrapper.findComponent(WineCard).vm.$emit('delete', '1');
        expect(alertSpy).toHaveBeenCalledWith('Failed to delete wine tasting sheet');
        alertSpy.mockRestore();
    });

    it('handles delete error', async () => {
        (dataService.getAllSheets as jest.Mock).mockResolvedValue([...mockWineSheets]);
        const error = new Error('Delete error');
        (dataService.deleteSheet as jest.Mock).mockRejectedValue(error);
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        await wrapper.vm.$nextTick();
        await wrapper.findComponent(WineCard).vm.$emit('delete', '1');
        expect(alertSpy).toHaveBeenCalledWith('Error deleting wine tasting sheet');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Delete error:', error);
        alertSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('navigates to "/create" when the "Create New" button is clicked in the empty state', async () => {
        await wrapper.vm.$nextTick();
        const router = useRouter() as jest.Mocked<ReturnType<typeof useRouter>>;

        const createButton = wrapper.find('a.btn');
        expect(createButton.exists()).toBe(true);
        await createButton.trigger('click');
        expect(router.push).toHaveBeenCalledWith('/create');
    });
});