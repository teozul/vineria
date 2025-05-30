import { mount } from '@vue/test-utils';
import WineCard from '@/components/WineCard.vue';
import { createMockWineSheet } from '../../shared/canned/WhineTastingSheetCanned';
import { WineType, WineTastingSheet } from '@/models/WineTastingSheet';

describe('WineCard.vue', () => {
    let wrapper: ReturnType<typeof mount>;

    let mockWineSheet = createMockWineSheet()
    beforeEach(() => {
        wrapper = mount(WineCard, {
            props: {
                wineSheet: mockWineSheet,
            },
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            },
        });
    });

    it('renders "No wine tasting sheet data available." when wineSheet prop is null', () => {
        const wrapperWithoutData = mount(WineCard, {
            props: {
                wineSheet: null,
            },
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot></slot></a>',
                    },
                },
            },
        });
        expect(wrapperWithoutData.find('.no-data').exists()).toBe(true);
        expect(wrapperWithoutData.find('.no-data p').text()).toBe('No wine tasting sheet data available.');
        expect(wrapperWithoutData.find('.wine-details').exists()).toBe(false);
    });

    it('renders wine details when wineSheet prop is provided', () => {
        expect(wrapper.find('.wine-details').exists()).toBe(true);
        expect(wrapper.find('.wine-card-header h3').text()).toBe(mockWineSheet.denomination);
        expect(wrapper.find('.wine-type').text()).toBe('Rosso');
        expect(wrapper.find('.wine-type').classes()).toContain('wine-type-red');
        expect(wrapper.find('.wine-card-details p:nth-child(1)').text()).toBe(`Produttore: ${mockWineSheet.producer}`);
        expect(wrapper.find('.wine-card-details p:nth-child(2)').text()).toBe(`Anno: ${mockWineSheet.vintage}`);
        expect(wrapper.find('.wine-card-details p:nth-child(3)').text()).toBe(`Classificazione: Denominazione di Origine Controllata e Garantita (DOCG)`);
        expect(wrapper.find('.wine-card-details p:nth-child(4)').text()).toBe(`Assaggiato il: 1/1/2023`);
        expect(wrapper.find('button.btn-danger').exists()).toBe(true);
    });

    it('renders router links with correct "to" props', () => {
        const detailLink = wrapper.find('a[href="/detail/123"]');
        expect(detailLink.exists()).toBe(true);
        expect(detailLink.attributes('href')).toBe('/detail/123');
        expect(detailLink.text()).toBe('Dettagli');

        const editLink = wrapper.find('a[href="/edit/123"]');
        expect(editLink.exists()).toBe(true);
        expect(editLink.attributes('href')).toBe('/edit/123');
        expect(editLink.text()).toBe('Modifica');
    });

    it('opens the delete confirmation modal when the delete button is clicked', async () => {
        await wrapper.find('button.btn-danger').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.find('.modal-content h2').text()).toBe('Conferma eliminazione');
        expect(wrapper.find('.modal-body strong:nth-child(1)').text()).toBe(mockWineSheet.denomination);
        expect(wrapper.find('.modal-body strong:nth-child(2)').text()).toBe(mockWineSheet.producer);
    });

    it('closes the delete confirmation modal when the cancel button is clicked', async () => {
        await wrapper.find('button.btn-danger').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(true);
        await wrapper.find('.modal-actions button.btn-secondary').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(false);
    });

    it('closes the delete confirmation modal when the close button (x) is clicked', async () => {
        await wrapper.find('button.btn-danger').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(true);
        await wrapper.find('.modal-close').trigger('click');
        expect(wrapper.find('.modal').exists()).toBe(false);
    });

    it('emits the "delete" event with the wineSheet ID when the confirm delete button is clicked', async () => {
        await wrapper.find('button.btn-danger').trigger('click');
        await wrapper.find('.modal-actions button.btn-danger').trigger('click');
        expect(wrapper.emitted('delete')).toBeTruthy();
        expect(wrapper.emitted('delete')![0]).toEqual([mockWineSheet.id]);
    });

    describe('Wine Type Styling', () => {
        it('applies correct CSS class for red wine', () => {
            const redWineSheet: WineTastingSheet = { ...mockWineSheet, wineType: WineType.RED };
            const wrapper = mount(WineCard, {
                props: { wineSheet: redWineSheet },
                global: {
                    components: {
                        RouterLink: {
                            props: ['to'],
                            template: '<a :href="to"><slot></slot></a>',
                        },
                    },
                },
            });
            expect(wrapper.find('.wine-type').classes()).toContain('wine-type-red');
        });

        it('applies correct CSS class for white wine', () => {
            const whiteWineSheet: WineTastingSheet = { ...mockWineSheet, wineType: WineType.WHITE };
            const wrapper = mount(WineCard, {
                props: { wineSheet: whiteWineSheet },
                global: {
                    components: {
                        RouterLink: {
                            props: ['to'],
                            template: '<a :href="to"><slot></slot></a>',
                        },
                    },
                },
            });
            expect(wrapper.find('.wine-type').classes()).toContain('wine-type-white');
        });

        it('applies correct CSS class for rose wine', () => {
            const roseWineSheet: WineTastingSheet = { ...mockWineSheet, wineType: WineType.ROSE };
            const wrapper = mount(WineCard, {
                props: { wineSheet: roseWineSheet },
                global: {
                    components: {
                        RouterLink: {
                            props: ['to'],
                            template: '<a :href="to"><slot></slot></a>',
                        },
                    },
                },
            });
            expect(wrapper.find('.wine-type').classes()).toContain('wine-type-rose');
        });
    });

    describe('Date Formatting', () => {
        it('formats the date correctly', () => {
            const wineSheetWithDate: WineTastingSheet = { ...mockWineSheet, date: '2023-01-01' };
            const wrapper = mount(WineCard, {
                props: { wineSheet: wineSheetWithDate },
                global: {
                    components: {
                        RouterLink: {
                            props: ['to'],
                            template: '<a :href="to"><slot></slot></a>',
                        },
                    },
                },
            });
            expect(wrapper.find('.wine-card-details p:nth-child(4)').text()).toBe('Assaggiato il: 1/1/2023');
        });
    });

    describe('Error States', () => {
        it('handles missing denomination gracefully', () => {
            const wineSheetWithoutDenomination: WineTastingSheet = { ...mockWineSheet, denomination: '' };
            const wrapper = mount(WineCard, {
                props: { wineSheet: wineSheetWithoutDenomination },
                global: {
                    components: {
                        RouterLink: {
                            props: ['to'],
                            template: '<a :href="to"><slot></slot></a>',
                        },
                    },
                },
            });
            expect(wrapper.find('.wine-card-header h3').text()).toBe('');
        });

        it('handles missing producer gracefully', () => {
            const wineSheetWithoutProducer: WineTastingSheet = { ...mockWineSheet, producer: '' };
            const wrapper = mount(WineCard, {
                props: { wineSheet: wineSheetWithoutProducer },
                global: {
                    components: {
                        RouterLink: {
                            props: ['to'],
                            template: '<a :href="to"><slot></slot></a>',
                        },
                    },
                },
            });
            expect(wrapper.find('.wine-card-details p:nth-child(1)').text()).toBe('Produttore:');
        });
    });
});