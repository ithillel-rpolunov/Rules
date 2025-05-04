// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/**
 * @param {string} property
 * @param {string} value
 */
Cypress.Commands.add('shouldHaveCss', { prevSubject: 'element' }, (subject, property, value) => {
    cy.wrap(subject).should('have.css', property, value);
});

/**
 * @param {string} actualValueString
 * @param {string} expectedValueString
 * @param {number} tolerance
 */
Cypress.Commands.add('sizeShouldBeInRange', (actualValueString, expectedValueString, tolerance = 3) => {
    const actualNumber = parseFloat(actualValueString);
    const expectedNumber = parseFloat(expectedValueString);
    const min = expectedNumber - tolerance;
    const max = expectedNumber + tolerance;
    expect(actualNumber).to.be.within(min, max, `Expected ${actualNumber} to be within ${min}-${max}`);
})
