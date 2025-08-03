import 'cypress-mochawesome-reporter/register';


// Permitir que los tests continúen después de errores
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

beforeEach(() => {
  cy.clearLocalStorage()
});
