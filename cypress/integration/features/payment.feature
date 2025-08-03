Feature: Payment Page

  Scenario: Enter valid card details
    Given I am on the payment page
    When I enter a valid card number, expiration date, and name
    And I click "Place Order"
    Then I should be taken to the success page

  Scenario: Submit with invalid card number
    Given I am on the payment page
    When I enter an invalid card number
    Then I should see a validation error message "Card number must be 16 digits"

  Scenario: Submit with invalid CVV
    Given I am on the payment page
    When I enter an invalid CVV
    Then I should see a validation error message "CVV must be 3 or 4 digits"

  Scenario: Submit with invalid Card Holder Name
    Given I am on the payment page
    When I enter an invalid Card Holder name, with numbers or less than 2 characters
    Then I should see a validation error message "Card holder name must be 2-50 characters and contain only letters"
