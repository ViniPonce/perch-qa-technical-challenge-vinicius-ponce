Feature: Success Page

  Scenario: Display confirmation after order
    Given I have completed a purchase
    Then I should see a confirmation message
    And a summary of the order

  Scenario: Return to home or view your orders
    Given I am on the success page
    When I click the "Go to Profile" or "View your Orders" button
    Then I should be redirected accordingly
