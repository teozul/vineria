import { mount } from '@vue/test-utils';
import WineTypeBadge from '@/components/WineTypeBadge.vue';
import { WineType } from '@/models/WineTastingSheet';

describe('WineTypeBadge.vue', () => {
    it('renders the correct label and class for red wine', () => {
        const wrapper = mount(WineTypeBadge, { props: { wineType: WineType.RED } });
        expect(wrapper.text()).toBe('Rosso');
        expect(wrapper.classes()).toContain('wine-type');
        expect(wrapper.classes()).toContain('wine-type-red');
    });

    it('renders the correct label and class for white wine', () => {
        const wrapper = mount(WineTypeBadge, { props: { wineType: WineType.WHITE } });
        expect(wrapper.text()).toBe('Bianco');
        expect(wrapper.classes()).toContain('wine-type');
        expect(wrapper.classes()).toContain('wine-type-white');
    });

    it('renders the correct label and class for rose wine', () => {
        const wrapper = mount(WineTypeBadge, { props: { wineType: WineType.ROSE } });
        expect(wrapper.text()).toBe('Rosè');
        expect(wrapper.classes()).toContain('wine-type');
        expect(wrapper.classes()).toContain('wine-type-rose');
    });
}); 