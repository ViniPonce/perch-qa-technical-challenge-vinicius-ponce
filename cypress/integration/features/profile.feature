Feature: Profile Page

  Scenario: View user information
    Given I am on the profile page
    Then I should see my user name and contact info

  Scenario: View order history
    Given I am on the profile page
    Then I should see a list of past orders with infos

  Scenario: Click on order for details
    Given I am on the profile page
    When I click on an order
    Then I should see the full details of that purchase

  Scenario: Click on Back to Home button
    Given I am on the profile page
    When I click on Back to Home button
    Then I should be redirected to Homepage

  Scenario: Edit profile
    Given I am on the profile page
    When I click on Edit profile button
    Then I should be allowed to change my name information
    And I should be allowed to email information
    And The changes should be saved whenever I click on button Save changes

    

