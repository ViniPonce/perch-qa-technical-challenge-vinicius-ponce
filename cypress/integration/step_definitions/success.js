const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

Given('I have completed a purchase', () => {
  cy.fixture('successOrder').then((data) => {
    cy.visit('/success', {
      onBeforeLoad(win) {
        win.localStorage.setItem('paymentStatus', data.paymentStatus);
        win.localStorage.setItem('shopping-cart', JSON.stringify(data['shopping-cart']));
      }
    });
  });
});

Then('I should see a confirmation message', () => {
  cy.get('[data-testid="success-page"]').should('be.visible');
  cy.contains('Thank You for Your Purchase!').should('exist');
  cy.get('[data-testid="order-number"]').should('exist');
});

Then('a summary of the order', () => {
  cy.get('[data-testid="order-info"]').should('contain.text', 'Order Number');
});

Given('I am on the success page', () => {
  cy.visit('/success', {
    onBeforeLoad(win) {
      win.localStorage.setItem('paymentStatus', 'success');
      win.localStorage.setItem('shopping-cart', JSON.stringify([]));
    }
  });
});

When('I click the "Go to Profile" or "View your Orders" button', () => {
  cy.get('[data-testid="view-orders"]').click();
});

Then('I should be redirected accordingly', () => {
  cy.url().should('include', '/profile');
});
