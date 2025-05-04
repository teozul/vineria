import { WineType } from '@/models/WineTastingSheet';

describe('Create Wine Tasting Sheet', () => {
    it('should create a new wine tasting sheet', () => {
      // Visit the home page
      cy.visit('/');
      
      // Click on "New Tasting" button
      cy.contains('New Tasting').click();
      
      // Verify we are on the create page
      cy.url().should('include', '/create');
      
      // Fill Basic Information
      cy.get('#location').type('Test Cellar');
      cy.get('#date').type('2023-06-15');
      cy.get('#time').type('14:30');
      
      // Fill Wine Details
      cy.get('#producer').type('E2E Test Producer');
      cy.get('#denomination').type('Barolo Test');
      cy.get('#classification').select('DOCG');
      cy.get('#vintage').type('2018');
      cy.get('#wineType').select(WineType.RED);
      cy.get('#alcoholContent').type('14.5');
      cy.get('#temperature').type('18');
      
      // Fill Visual Examination
      cy.get('#limpidity').select('Limpido');
      cy.get('#transparency').select('Trasparente');
      cy.get('#colorTone').select('Rosso rubino');
      cy.get('#colorIntensity').select('Intenso');
      cy.get('#fluidity').select('Poco denso');
      
      // Fill Olfactory Examination
      cy.get('#olfactoryIntensity').select('Intenso');
      cy.get('#olfactoryFranchness').select('Schietto');
      cy.get('#olfactoryFineness').select('Fine');
      cy.get('#aroma-0').check(); // Select first aroma type
      cy.get('#olfactoryComplexity').select('Mediamente complesso');
      
      // Fill Gustatory Examination
      cy.get('#body').select('Di corpo');
      cy.get('#alcoholLevel').select('Caldo');
      cy.get('#softness').select('Morbido');
      cy.get('#sugars').select('Secco');
      cy.get('#acidity').select('Fresco');
      cy.get('#salinity').select('Leggerm. sapido');
      cy.get('#tannins').select('Giusto tannico');
      cy.get('#balance').select('Equilibrato');
      cy.get('#retroIntensity').select('Intenso');
      cy.get('#retroQuality').select('Fine');
      cy.get('#retroPersistence').select('Persistente');
      
      // Fill Final Evaluation
      cy.get('#evolutionaryState').select('Pronto');
      cy.get('#finalConsiderations').type('This is a test wine created by Cypress E2E tests.');
      
      // Submit the form 
      cy.get('.form-actions button[type="submit"]').click();
      
      // Verify redirection to home page
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      // Verify the new wine sheet appears in the list
      cy.get('.wine-card').should('have.length.at.least', 1);
      cy.contains('Barolo Test').should('exist');
      cy.contains('E2E Test Producer').should('exist');
    });
  });