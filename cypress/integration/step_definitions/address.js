const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');



Given("I am on the address page", () => {
  cy.visit("http://localhost:3000/checkout/address");
});


When('I enter name, address, postal code, and phone number', () => {
  cy.get('input[name="firstName"]').type('Lucas');
  cy.get('input[name="email"]').type('lucas@example.com');
  cy.get('input[name="phone"]').type('11999999999');
  cy.get('input[name="city"]').type('Sao Paulo')
  cy.get('input[name="state"]').type('Sao Paulo')
  cy.get('input[name="street"]').type('Rua das Flores, 123');
  cy.get('input[name="zipCode"]').type('12345');
  cy.get('input[name="country"]').type('Brasil')
});

When('I click {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

Then('I should be taken to the payment page', () => {
  cy.url().should('include', '/checkout/payment');
});

When('I leave the address fields blank and click {string}', (buttonText) => {
  cy.get('input[name="firstName"]').clear();
  cy.get('input[name="email"]').clear();
  cy.get('input[name="phone"]').clear();
  cy.get('input[name="street"]').clear();
  cy.get('input[name="zipCode"]').clear();
  cy.contains('button', buttonText).click();
});

Then('I should see validation errors', () => {
  cy.get('.error').should('have.length.greaterThan', 0);
});

// Email error
When("I don't input an valid email address", () => {
  cy.get('input[name="firstName"]').type('Lucas');
  cy.get('input[name="email"]').type('invalid-email');
  cy.get('input[name="phone"]').type('11999999999');
  cy.get('input[name="street"]').type('Rua das Flores, 123');
  cy.get('input[name="zipCode"]').type('12345');
  cy.contains('button', 'Continue').click();
});

Then("I should see 'Please enter a valid email address' error", () => {
  cy.contains('Please enter a valid email address').should('be.visible');
});

// Phone number error
When("I don't input an valid phone number between 10-15 digits", () => {
  cy.get('input[name="firstName"]').type('Lucas');
  cy.get('input[name="email"]').type('lucas@example.com');
  cy.get('input[name="phone"]').type('123');
  cy.get('input[name="street"]').type('Rua das Flores, 123');
  cy.get('input[name="zipCode"]').type('12345');
  cy.contains('button', 'Continue').click();
});

Then("I should see 'Phone number must be 10-15 digits' error", () => {
  cy.contains('Phone number must be 10-15 digits').should('be.visible');
});

// Street Address error
When("I don't input an valid street address with at least 5 characters", () => {
  cy.get('input[name="firstName"]').type('Lucas');
  cy.get('input[name="email"]').type('lucas@example.com');
  cy.get('input[name="phone"]').type('11999999999');
  cy.get('input[name="street"]').type('Rua');
  cy.get('input[name="zipCode"]').type('12345');
  cy.contains('button', 'Continue').click();
});

Then("I should see 'Street address must be at least 5 characters' error", () => {
  cy.contains('Street address must be at least 5 characters').should('be.visible');
});

// ZIP Code error
When("I don't input an valid street address with 5 or 4 digits", () => {
  cy.get('input[name="firstName"]').type('Lucas');
  cy.get('input[name="email"]').type('lucas@example.com');
  cy.get('input[name="phone"]').type('11999999999');
  cy.get('input[name="street"]').type('Rua das Flores, 123');
  cy.get('input[name="zipCode"]').type('12');
  cy.contains('button', 'Continue').click();
});

Then("I should see 'ZIP code must be 4 or 5 digits' error", () => {
  cy.contains('ZIP code must be 4 or 5 digits').should('be.visible');
});

// Name validation error
When("I don't input a name with only letters and with containing only letters", () => {
  cy.get('input[name="firstName"]').type('12345');
  cy.get('input[name="email"]').type('lucas@example.com');
  cy.get('input[name="phone"]').type('11999999999');
  cy.get('input[name="street"]').type('Rua das Flores, 123');
  cy.get('input[name="zipCode"]').type('12345');
  cy.contains('button', 'Continue').click();
});

Then("I should see 'Name must be 2-30 characters and contain only letters' error", () => {
  cy.contains('Name must be 2-30 characters and contain only letters').should('be.visible');
});
