import * as Vue from 'vue';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';


describe('AppHeader.vue', () => {
  // Create mock routes that match your application structure
  const routes: RouteRecordRaw[] = [
    { 
      path: '/', 
      name: 'home',
      component: { template: '<div>Home Page</div>' }
    },
    { 
      path: '/create', 
      name: 'create',
      component: { template: '<div>Create Page</div>' }
    }
  ];

  // Create a router instance with the mock routes
  const router = createRouter({
    history: createWebHistory(),
    routes
  });

  it('renders the header with the correct title', async () => {
    // Mount the component with router
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });
    
    // Check if the logo text is rendered correctly
    expect(wrapper.find('.logo h1').text()).toBe('Wine Tasting');
  });

  it('renders navigation links correctly', async () => {
    // Mount the component with router
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });

    // Get all nav links
    const navLinks = wrapper.findAll('.nav-link');
    
    // Check if we have the expected number of links
    expect(navLinks).toHaveLength(2);
    
    // Check if the links have the correct text
    expect(navLinks[0].text()).toBe('Home');
    expect(navLinks[1].text()).toBe('New Tasting');
    
    // Check if the links have the correct href attributes
    expect(navLinks[0].attributes('href')).toBe('/');
    expect(navLinks[1].attributes('href')).toBe('/create');
  });

  it('applies active class to current route', async () => {
    // Set initial route
    router.push('/');
    await router.isReady();
    
    // Mount the component with router
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });

    // Initially, home link should be active
    expect(wrapper.findAll('.nav-link')[0].classes()).toContain('router-link-active');
    
    // Navigate to create route
    await router.push('/create');
    
    // Now create link should be active
    expect(wrapper.findAll('.nav-link')[1].classes()).toContain('router-link-active');
  });
}); 