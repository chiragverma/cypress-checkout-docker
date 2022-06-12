import selectors from '../support/selectors.js';

// -- This is the common checkout function --
Cypress.Commands.add('fillCheckout', () => {
    cy.fixture("userdata.json").then((user) => {
    cy.get(selectors.email).should('exist').type(user.email);
    cy.get(selectors.number).should('exist').type(user.cardNumber);
    cy.get(selectors.cardCvc).should('exist').type(user.cvc);
    cy.get(selectors.cardExpiry).type("12" + (new Date().getFullYear() + 10).toString().substr(-2));
    cy.get(selectors.name).should('exist').type(user.name);
    cy.get(selectors.postalCode).should('exist').type(user.postalCode);
    cy.get(selectors.submit).should(($div) => {
      expect($div.text()).to.include("Pay");
    });
    cy.get(selectors.submit).click();
    cy.get(selectors.submit).should(($div) => {
        expect($div.text()).to.include("Processing");
    });
});
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//