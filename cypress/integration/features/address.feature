Feature: Address Page

console.log('Step definitions loaded');

  Scenario: Fill in address information
    Given I am on the address page
    When I enter name, address, postal code, and phone number
    And I click "Continue"
    Then I should be taken to the payment page

  Scenario: Leave required fields blank
    Given I am on the address page
    When I leave the address fields blank and click "Continue"
    Then I should see validation errors

  Scenario: Email error
    Given I am on the address page
    When I don't input an valid email address
    Then I should see 'Please enter a valid email address' error

  Scenario: Phone error
    Given I am on the address page
    When I don't input an valid phone number between 10-15 digits
    Then I should see 'Phone number must be 10-15 digits' error

  Scenario: Street Address error
    Given I am on the address page
    When I don't input an valid street address with at least 5 characters
    Then I should see 'Street address must be at least 5 characters' error

  Scenario: ZIP Code error
    Given I am on the address page
    When I don't input an valid street address with 5 or 4 digits
    Then I should see 'ZIP code must be 4 or 5 digits' error

  Scenario: First Name error
    Given I am on the address page
    When I don't input a name with only letters and with containing only letters
    Then I should see 'Name must be 2-30 characters and contain only letters' error
