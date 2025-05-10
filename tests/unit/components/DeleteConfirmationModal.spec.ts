import { mount } from '@vue/test-utils';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import { WineTastingSheet, WineType } from '@/models/WineTastingSheet';

describe('DeleteConfirmationModal.vue', () => {
    const mockWineSheet: WineTastingSheet = {
        id: '1',
        denomination: 'Test Wine',
        producer: 'Test Producer',
        vintage: 2022,
        wineType: WineType.RED,
        classification: 'DOC',
        date: '2023-01-01',
    } as WineTastingSheet;

    it('does not render when show is false', () => {
        const wrapper = mount(DeleteConfirmationModal, {
            props: { show: false, item: mockWineSheet }
        });
        expect(wrapper.find('.modal').exists()).toBe(false);
    });

    it('renders modal with correct wine info when show is true', () => {
        const wrapper = mount(DeleteConfirmationModal, {
            props: { show: true, item: mockWineSheet }
        });
        expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.find('.modal-body strong').text()).toContain('Test Wine');
        expect(wrapper.find('.modal-body').text()).toContain('Test Producer');
    });

    it('emits cancel when cancel button is clicked', async () => {
        const wrapper = mount(DeleteConfirmationModal, {
            props: { show: true, item: mockWineSheet }
        });
        await wrapper.find('button.btn-secondary').trigger('click');
        expect(wrapper.emitted('cancel')).toBeTruthy();
    });

    it('emits cancel when close (x) button is clicked', async () => {
        const wrapper = mount(DeleteConfirmationModal, {
            props: { show: true, item: mockWineSheet }
        });
        await wrapper.find('.modal-close').trigger('click');
        expect(wrapper.emitted('cancel')).toBeTruthy();
    });

    it('emits confirm when delete button is clicked', async () => {
        const wrapper = mount(DeleteConfirmationModal, {
            props: { show: true, item: mockWineSheet }
        });
        await wrapper.find('button.btn-danger').trigger('click');
        expect(wrapper.emitted('confirm')).toBeTruthy();
    });
}); 