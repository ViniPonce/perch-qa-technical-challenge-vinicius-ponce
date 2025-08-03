const cucumber = require('cypress-cucumber-preprocessor').default;
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = {
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: true,
    html: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on);
      on('file:preprocessor', cucumber());
      return config;
    },
    specPattern: 'cypress/integration/**/*.feature',
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    experimentalRunAllSpecs: true,
    testIsolation: false
  },
  env: {
    stepDefinitions: 'cypress/integration/step_definitions'
  }
};
