const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

Given('I am on the payment page', () => {
  cy.visit('/checkout/payment');
  cy.get('[data-testid="payment-page"]').should('be.visible');
});

When('I enter a valid card number, expiration date, and name', () => {
  cy.get('[data-testid="cardholder-input"]').type('John Doe');
  cy.get('[data-testid="card-number-input"]').type('4111 1111 1111 1111');
  cy.get('[data-testid="expiry-input"]').type('1228');
  cy.get('[data-testid="cvv-input"]').type('123');
});

When('I click {string}', (buttonText) => {
  cy.get('button.add-to-cart-button')
    .should('be.visible')
    .and('have.text', buttonText)
    .click();
});



Then('I should be taken to the success page', () => {
  cy.location('pathname').should('include', '/checkout/success');
  cy.contains('Order Number').should('exist');
});

When('I enter an invalid card number', () => {
  cy.get('[data-testid="cardholder-input"]').type('John Doe');
  cy.get('[data-testid="card-number-input"]').type('1234 5678 9');
  cy.get('[data-testid="expiry-input"]').type('1228');
  cy.get('[data-testid="cvv-input"]').type('123');
  cy.get('[data-testid="complete-payment"]').click();
});

Then('I should see a validation error message {string}', (message) => {
  cy.contains('.error-message', message).should('be.visible');
});

When('I enter an invalid CVV', () => {
  cy.get('[data-testid="cardholder-input"]').type('John Doe');
  cy.get('[data-testid="card-number-input"]').type('4111 1111 1111 1111');
  cy.get('[data-testid="expiry-input"]').type('1228');
  cy.get('[data-testid="cvv-input"]').type('12'); // invalid CVV
  cy.get('[data-testid="complete-payment"]').click();
});

When('I enter an invalid Card Holder name, with numbers or less than 2 characters', () => {
  cy.get('[data-testid="cardholder-input"]').type('1');
  cy.get('[data-testid="card-number-input"]').type('4111 1111 1111 1111');
  cy.get('[data-testid="expiry-input"]').type('1228');
  cy.get('[data-testid="cvv-input"]').type('123');
  cy.get('[data-testid="complete-payment"]').click();
});


