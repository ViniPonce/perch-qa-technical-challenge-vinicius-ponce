Feature: Homepage behavior and product catalog

  Scenario: User visits the homepage
    Given I am on the homepage
    Then I should see the page title as "Product Catalog"
    And I should see the Profile button
    And I should see the Cart button

  Scenario: User uses the search bar
    Given I am on the homepage
    When I search for "Classic White Sneakers"
    Then I should see only one product card with name "Classic White Sneakers"
    And I should not see the "Premium Leather Watch" product

  Scenario: User searches for a product that does not exist
    Given I am on the homepage
    When I search for "Tablet"
    Then I should see a no results message

  Scenario: User sorts products by price
    Given I am on the homepage
    When I click on the sort button
    Then the products should be displayed in price order

  Scenario: User navigates to profile
    Given I am on the homepage
    When I click the Profile button
    Then I should be redirected to the profile page

  Scenario: User navigates to cart
    Given I am on the homepage
    When I click the Cart button
    Then I should be redirected to the cart page

  Scenario: User clicks on View Details of a product
    Given I am on the homepage
    When I click on the View Details of the "Wireless Headphones"
    Then I should be redirected to the product details page of "Wireless Headphones"
