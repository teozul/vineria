import { mount } from '@vue/test-utils';
import WineGrid from '@/components/WineGrid.vue';
import { WineTastingSheet, WineType } from '@/models/WineTastingSheet';

describe('WineGrid.vue', () => {
    const mockWineSheets: WineTastingSheet[] = [
        {
            id: '1',
            denomination: 'Wine One',
            producer: 'Producer One',
            vintage: 2020,
            wineType: WineType.RED,
            classification: 'DOC',
            date: '2023-01-01',
        } as WineTastingSheet,
        {
            id: '2',
            denomination: 'Wine Two',
            producer: 'Producer Two',
            vintage: 2021,
            wineType: WineType.WHITE,
            classification: 'IGT',
            date: '2023-02-01',
        } as WineTastingSheet,
    ];

    function factory() {
        return mount(WineGrid, {
            props: { wineSheets: mockWineSheets },
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                    WineTypeBadge: {
                        props: ['wineType'],
                        template: '<span class="wine-type-badge">{{ wineType }}</span>',
                    },
                },
            },
        });
    }

    it('renders table headers', () => {
        const wrapper = factory();
        const headers = wrapper.findAll('th');
        expect(headers.map(h => h.text())).toEqual([
            'Nome', 'Produttore', 'Anno', 'Tipo di vino', 'Classificazione', 'Assaggiato il', 'Azioni'
        ]);
    });

    it('renders a row for each wine sheet', () => {
        const wrapper = factory();
        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(mockWineSheets.length);
    });

    it('renders correct wine data in each cell', () => {
        const wrapper = factory();
        const firstRow = wrapper.findAll('tbody tr')[0];
        expect(firstRow.text()).toContain('Wine One');
        expect(firstRow.text()).toContain('Producer One');
        expect(firstRow.text()).toContain('2020');
        expect(firstRow.text()).toContain('DOC');
        expect(firstRow.text()).toContain('1/1/2023');
    });

    it('renders action buttons with correct links', () => {
        const wrapper = factory();
        const firstRow = wrapper.findAll('tbody tr')[0];
        const detailLink = firstRow.find('a[href="/detail/1"]');
        const editLink = firstRow.find('a[href="/edit/1"]');
        expect(detailLink.exists()).toBe(true);
        expect(editLink.exists()).toBe(true);
    });

    it('opens the delete confirmation modal when delete is clicked', async () => {
        const wrapper = factory();
        const firstDeleteBtn = wrapper.findAll('button.btn-danger')[0];
        await firstDeleteBtn.trigger('click');
        expect(wrapper.findComponent({ name: 'DeleteConfirmationModal' }).exists()).toBe(true);
    });

    it('closes the delete confirmation modal when the cancel button is clicked', async () => {
        const wrapper = factory();
        await wrapper.find('button.btn-danger').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(true);
        await wrapper.find('.modal-actions button.btn-secondary').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(false);
    });

    it('closes the delete confirmation modal when the close button (x) is clicked', async () => {
        const wrapper = factory();
        await wrapper.find('button.btn-danger').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(true);
        await wrapper.find('.modal-close').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(false);
    });

    it('emits delete event with correct id when confirm is clicked', async () => {
        const wrapper = factory();
        await wrapper.find('button.btn-danger').trigger('click');
        await wrapper.find('.modal-actions button.btn-danger').trigger('click');
        expect(wrapper.emitted('delete')).toBeTruthy();
        expect(wrapper.emitted('delete')![0]).toEqual([mockWineSheets[0].id]);
    });
}); 