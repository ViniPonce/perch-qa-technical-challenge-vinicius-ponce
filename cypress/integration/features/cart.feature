Feature: Cart Page

  Scenario: View products in the cart
    Given I have added a product to the cart
    When I visit the cart page
    Then I should see the product in the cart with quantity and price

  Scenario: Change quantity of a product
    Given I have a product in the cart
    When I change the quantity
    Then the total price should update accordingly

  Scenario: Remove a product from the cart
    Given I have a product in the cart
    When I click the remove button
    Then the product should no longer be listed

  Scenario: Proceed to checkout
    Given I have items in the cart
    When I click the "Proceed to Checkout" button
    Then I should be taken to the address page

  Scenario: Continue Shopping
  Given I'm on cart page
  When I click on Continue Shopping button
  Then I should be taken to Products Page