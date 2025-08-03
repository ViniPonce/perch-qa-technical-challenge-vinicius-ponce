const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

Given('I am on the homepage', () => {
  cy.visit('/');
});

Then('I should see the page title as {string}', (title) => {
  cy.get('h1').should('contain', title);
});

Then('I should see the Profile button', () => {
  cy.get('[data-testid="nav-to-profile"]').should('be.visible');
});

Then('I should see the Cart button', () => {
  cy.get('[data-testid="nav-to-cart"]').should('be.visible');
});

When('I search for {string}', (term) => {
  cy.get('[data-testid="product-search"]').clear().type(term);
});

Then('I should see only one product card with name {string}', (productName) => {
  cy.get('article[data-testid^="product-"]:visible')
    .should('have.length', 1)
    .first()
    .within(() => {
      cy.get('.product-name').should('have.text', productName);
    });
});

Then('I should not see the {string} product', (productName) => {
  cy.contains(productName).should('not.exist');
});

Then('I should see a no results message', () => {
  cy.get('[data-testid="no-results"]').should('contain', 'No products found');
});

When('I click on the sort button', () => {
  cy.get('[data-testid="sort-price"]').click();
});

Then('the products should be displayed in price order', () => {
  cy.get('article[data-testid^="product-"]:visible').then(($cards) => {
    const prices = [];

    $cards.each((index, card) => {
      const priceText = card.querySelector('[data-testid^="price-"]').textContent;
      const price = parseFloat(priceText.replace('$', ''));
      prices.push(price);
    });

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sorted);
  });
});


When('I click the Profile button', () => {
  cy.get('[data-testid="nav-to-profile"]').click();
});

Then('I should be redirected to the profile page', () => {
  cy.url().should('include', '/profile');
});

When('I click the Cart button', () => {
  cy.get('[data-testid="nav-to-cart"]').click();
});

Then('I should be redirected to the cart page', () => {
  cy.url().should('include', '/cart');
});

When('I click on the View Details of the {string}', (productName) => {
  cy.contains(productName)
    .parents('[data-testid^="product-"]')
    .find('[data-testid^="view-product-"]')
    .click();
});

Then('I should be redirected to the product details page of {string}', (productName) => {
  cy.url().should('include', '/product/');
  cy.contains(productName).should('be.visible');
});
