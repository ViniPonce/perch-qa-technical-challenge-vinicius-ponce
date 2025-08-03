Feature: Product Page

  Scenario: View product details
    Given I am on a product page
    Then I should see the product name, price, and description

  Scenario: Select quantity and add to cart
    Given I am on a product page
    When I select quantity "2" and click "Add to Cart"
    Then the subtotal should reflect the correct total price

  Scenario: Add multiple quantities of a product
    Given I am on a product page
    When I select quantity "3" and click "Add to Cart"
    Then the subtotal should reflect the correct total price

  Scenario: Back to products
    Given I am on a product page
    When I click the button "Back to Products"
    Then I must be redirected to Homepage
