const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

let selectedQuantity = 1;
let unitPrice = 0;

Given('I am on a product page', () => {
  cy.visit('/product/1');
});

Then('I should see the product name, price, and description', () => {
  cy.get('[data-testid="product-name"]').should('be.visible');
  cy.get('[data-testid="product-price"]').should('be.visible');
  cy.get('[data-testid="product-description"]').should('be.visible');
});

When('I select quantity {string} and click {string}', (quantity, buttonText) => {
  selectedQuantity = Number(quantity);

  // Capture product unit price before clicking
  cy.get('[data-testid="product-price"]').invoke('text').then((priceText) => {
    
    unitPrice = parseFloat(priceText.replace('$', ''));

    cy.get('[data-testid="quantity-selector"]').select(quantity);
    cy.get('button.add-to-cart-button').contains(buttonText).click();
  });
});

Then('the subtotal should reflect the correct total price', () => {
  const expectedTotal = (unitPrice * selectedQuantity).toFixed(2);
  const expectedSubtotalText = expectedTotal; // sem o cifrão, pois o texto vem quebrado

  cy.get('[data-testid="subtotal"]').invoke('text').then((text) => {
    const subtotalClean = text.replace(/[^0-9.]/g, '');
    expect(subtotalClean).to.equal(expectedSubtotalText);
  });
});

When('I click the button {string}', (btnText) => {
  cy.contains('button', btnText).click();
});

Then('I must be redirected to Homepage', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});
