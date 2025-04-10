// tests/unit/components/AppHeader.spec.ts
import '@types/jest';
import { mount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';
import { createRouter, createWebHistory } from 'vue-router';
 
// Create a mock router
const createMockRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home' },
      { path: '/create', name: 'create' }
    ]
  });
};

describe('AppHeader.vue', () => {
  it('renders the header with logo and navigation', () => {
    const router = createMockRouter();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });
    
    // Check if logo exists
    expect(wrapper.find('.logo').exists()).toBe(true);
    
    // Check if logo contains the correct text
    expect(wrapper.find('.logo h1').text()).toBe('Wine Tasting');
    
    // Check if navigation exists
    expect(wrapper.find('.main-nav').exists()).toBe(true);
    
    // Check if navigation has the correct links
    const navLinks = wrapper.findAll('.nav-link');
    expect(navLinks.length).toBe(2);
    expect(navLinks[0].text()).toBe('Home');
    expect(navLinks[1].text()).toBe('New Tasting');
  });
  
  it('links to the correct routes', async () => {
    const router = createMockRouter();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });
    
    // Mock router push
    const routerPushSpy = jest.spyOn(router, 'push');
    
    // Get all links
    const logoLink = wrapper.find('.logo a');
    const homeLink = wrapper.findAll('.nav-link')[0];
    const newTastingLink = wrapper.findAll('.nav-link')[1];
    
    // Click on logo
    await logoLink.trigger('click');
    expect(routerPushSpy).toHaveBeenCalledWith(expect.objectContaining({ path: '/' }));
    
    // Click on home link
    await homeLink.trigger('click');
    expect(routerPushSpy).toHaveBeenCalledWith(expect.objectContaining({ path: '/' }));
    
    // Click on new tasting link
    await newTastingLink.trigger('click');
    expect(routerPushSpy).toHaveBeenCalledWith(expect.objectContaining({ path: '/create' }));
  });
  
  it('applies active class to current route', async () => {
    const router = createMockRouter();
    
    // Set initial route to home
    await router.push('/');
    
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });
    
    // Check if home link has active class
    let homeLink = wrapper.findAll('.nav-link')[0];
    let newTastingLink = wrapper.findAll('.nav-link')[1];
    
    expect(homeLink.classes()).toContain('router-link-active');
    expect(newTastingLink.classes()).not.toContain('router-link-active');
    
    // Change route to create
    await router.push('/create');
    
    // Need to re-query elements after route change
    homeLink = wrapper.findAll('.nav-link')[0];
    newTastingLink = wrapper.findAll('.nav-link')[1];
    
    expect(homeLink.classes()).not.toContain('router-link-active');
    expect(newTastingLink.classes()).toContain('router-link-active');
  });
  
  it('renders correctly on mobile viewport', async () => {
    // Mock window.innerWidth to simulate mobile viewport
    const originalInnerWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });
    
    // Trigger a resize event
    window.dispatchEvent(new Event('resize'));
    
    const router = createMockRouter();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });
    
    // Check if the header-container has mobile-specific styles
    // This is a bit tricky to test directly with Jest, so we're just checking
    // basic structure is preserved even in mobile
    expect(wrapper.find('.header-container').exists()).toBe(true);
    expect(wrapper.find('.logo').exists()).toBe(true);
    expect(wrapper.find('.main-nav').exists()).toBe(true);
    
    // Clean up
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
    window.dispatchEvent(new Event('resize'));
  });
}); 