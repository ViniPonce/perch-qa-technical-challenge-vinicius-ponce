const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

let profileData;

before(() => {
  cy.fixture('profileData').then((data) => {
    profileData = data;
  });
});

Given('I am on the profile page', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('orders', JSON.stringify(profileData.orders));
      win.localStorage.setItem('userProfile', JSON.stringify(profileData.profile));
    }
  });
  cy.visit('/profile');
});

Then('I should see my user name and contact info', () => {
  cy.get('[data-testid="profile-name"]').should('contain', profileData.profile.name);
  cy.get('[data-testid="profile-email"]').should('contain', profileData.profile.email);
});

Then('I should see a list of past orders with infos', () => {
  cy.get('[data-testid="orders-list"]').should('exist');
  cy.get(`[data-testid="order-${profileData.orders[0].orderNumber}"]`).should('exist');
});

When('I click on an order', () => {
  cy.get(`[data-testid="order-${profileData.orders[0].orderNumber}"]`).click();
});

Then('I should see the full details of that purchase', () => {
  const item = profileData.orders[0].items[0];
  cy.get(`[data-testid="order-${profileData.orders[0].orderNumber}-product-${item.id}"]`)
    .should('contain', item.name)
    .and('contain', `Quantity: ${item.quantity}`);
});

When('I click on Back to Home button', () => {
  cy.get('[data-testid="back-to-home"]').click();
});

Then('I should be redirected to Homepage', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

When('I click on Edit profile button', () => {
  cy.get('[data-testid="edit-profile"]').click();
});

Then('I should be allowed to change my name information', () => {
  cy.get('[data-testid="profile-name-input"]').clear().type('Jane Smith');
});

Then('I should be allowed to email information', () => {
  cy.get('[data-testid="profile-email-input"]').clear().type('jane.smith@example.com');
});

Then('The changes should be saved whenever I click on button Save changes', () => {
  cy.get('[data-testid="save-profile"]').click();
  cy.get('[data-testid="profile-name"]').should('contain', 'Jane Smith');
  cy.get('[data-testid="profile-email"]').should('contain', 'jane.smith@example.com');
});
