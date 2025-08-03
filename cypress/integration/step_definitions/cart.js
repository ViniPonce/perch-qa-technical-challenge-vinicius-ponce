const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

let product;

const addToLocalStorage = (product) => {
  localStorage.setItem('cart', JSON.stringify([product]));
};

beforeEach(() => {
  cy.fixture('cartItems').then((items) => {
    product = items[0];
  });
});

Given('I have a product in the cart', () => {
  cy.fixture('cartItems').then((items) => {
    const product = items[0];
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('cart', JSON.stringify([product]));
      },
    });
    cy.visit('/cart');
  });
});


Given('I have a product in the cart', () => {
  cy.fixture('cartItems').then((items) => {
    const product = items[0];
    cy.window().then((win) => {
      win.localStorage.setItem('cart', JSON.stringify([product]));
    });
  });
  cy.visit('/cart');
});

Given('I have items in the cart', () => {
  cy.visit('/cart');
  cy.window().then(() => {
    addToLocalStorage(product);
  });
  cy.reload();
});

When('I visit the cart page', () => {
  cy.visit('/cart');
});

Then('I should see the product in the cart with quantity and price', () => {
  cy.get(`[data-testid="cart-item-${product.id}"]`).should('be.visible');
  cy.get(`[data-testid="item-price-${product.id}"]`).should('contain', product.price.toFixed(2));
  cy.get(`[data-testid="quantity-${product.id}"]`).should('have.value', product.quantity.toString());
});

When('I change the quantity', () => {
  cy.get(`[data-testid="quantity-${product.id}"]`).select('2');
});

Then('the total price should update accordingly', () => {
  const expectedTotal = (product.price * 2).toFixed(2);
  cy.get('[data-testid="subtotal"]').should('contain', expectedTotal);
});

When('I click the remove button', () => {
  cy.get(`[data-testid="remove-${product.id}"]`).click();
});

Then('the product should no longer be listed', () => {
  cy.get(`[data-testid="cart-item-${product.id}"]`).should('not.exist');
});

When('I click the "Proceed to Checkout" button', () => {
  cy.get('[data-testid="proceed-to-checkout"]').click();
});

Then('I should be taken to the address page', () => {
  cy.url().should('include', '/checkout/address');
});

Given("I'm on cart page", () => {
  cy.visit('/cart');
});

When('I click on Continue Shopping button', () => {
  cy.get('[data-testid="continue-shopping"]').first().click();
});

Then('I should be taken to Products Page', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});
