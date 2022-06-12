import selectors from '../support/selectors.js';

class checkoutPage {

    static validateEmail() {
      cy.get(selectors.email).should('have.attr', 'aria-invalid', 'false');
      cy.get(selectors.email).clear().type('chirag.verma@');
      cy.focused().blur(); // validation is hapenning on blur
      cy.get(selectors.email).should('have.attr', 'aria-invalid', 'true');
      cy.get(selectors.email).clear().type('chirag@gmail.com');
      cy.focused().blur(); // validation is hapenning on blur
      cy.get(selectors.email).should('have.attr', 'aria-invalid', 'false');
    }

    static validatecardNumber() {
      cy.get(selectors.number).should('have.attr', 'aria-invalid', 'false');
      cy.get(selectors.number).clear().type('1111111111111111');
      cy.get(selectors.number).should('have.attr', 'aria-invalid', 'true');
      cy.get(selectors.number).clear().type('4242424242424242');
      cy.get(selectors.number).should('have.attr', 'aria-invalid', 'false');
    }

    static validatecardExpiry() {
      cy.get(selectors.cardExpiry).should('have.attr', 'aria-invalid', 'false');
      cy.get(selectors.cardExpiry).clear().type('1111');
      cy.get(selectors.cardExpiry).should('have.attr', 'aria-invalid', 'true');
      cy.get(selectors.cardExpiry).clear().type('1122');
      cy.get(selectors.cardExpiry).should('have.attr', 'aria-invalid', 'false');
    }

    static validatecardCvc() {
      cy.get(selectors.cardCvc).should('have.attr', 'aria-invalid', 'false');
      cy.get(selectors.cardCvc).clear().type('12');
      cy.focused().blur(); // validation is hapenning on blur
      cy.get(selectors.cardCvc).should('have.attr', 'aria-invalid', 'true');
      cy.get(selectors.cardCvc).clear().type('123');
      cy.focused().blur(); // validation is hapenning on blur
      cy.get(selectors.cardCvc).should('have.attr', 'aria-invalid', 'false');
    }

    static validatepostalCode() {
      cy.get(selectors.postalCode).should('have.attr', 'aria-invalid', 'false');
      cy.get(selectors.postalCode).clear().type('12');
      cy.focused().blur(); // validation is hapenning on blur
      cy.get(selectors.postalCode).should('have.attr', 'aria-invalid', 'true');
      cy.get(selectors.postalCode).clear().type('94043');
      cy.focused().blur(); // validation is hapenning on blur
      cy.get(selectors.postalCode).should('have.attr', 'aria-invalid', 'false');
    }

    static verify_requiredMessage_all() {
      cy.get(selectors.submit).click();
      cy.get(selectors.requiredEmail).contains('Required')
      cy.get(selectors.requiredCardDetails).contains('Required')
      cy.get(selectors.requiredName).contains('Required')
    }

    static verify_requiredMessage_cardAndName() {
      cy.get(selectors.email).type('chiragverma@gmail.com');
      cy.get(selectors.requiredEmail).should('not.exist');
      cy.get(selectors.requiredCardDetails).contains('Required')
      cy.get(selectors.requiredName).contains('Required')  
    }

    static verify_requiredMessage_name() {
      cy.get(selectors.number).type('4242424242424242');
      cy.get(selectors.cardExpiry).type('1128')
      cy.get(selectors.cardCvc).type('424');
      cy.get(selectors.requiredCardDetails).should('not.exist');
      cy.get(selectors.requiredName).contains('Required')
    }

    static verify_requiredMessage_none() {
      cy.get(selectors.name).type('Chirag Verma');
      cy.get(selectors.requiredEmail).should('not.exist');
      cy.get(selectors.requiredCardDetails).should('not.exist');
      cy.get(selectors.requiredName).should('not.exist'); 
    }

}

export default checkoutPage