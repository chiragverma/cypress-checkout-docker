//--In this test we will validate all checkout form fields
import selectors from '../../support/selectors.js';
import checkoutPage from '../../pages/checkoutpage.js';

const url = ("https://checkout.stripe.dev/api/demo-session?country=us&billingPeriod=monthly&hasBgColor=false&hasBillingAndShipping=false&hasCoupons=false&hasFreeTrial=false&hasShippingRate=false&hasTaxes=false&mode=payment&wallet=googlePay&hasPolicies=false&billingType=flat")

describe('Checkout Form Validation', () => {
  beforeEach(() => {
    cy.request(url).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("url");
      cy.visit(response.body.url);
      cy.url().should("contains", "https://checkout.stripe.com/pay/");
    });
  });

    it('should display required error message when mandatory fields are left empty', () => {
      // click submit without filling any fields and it should display required message on email, card details and name
      checkoutPage.verify_requiredMessage_all()

      // enter email only then click submit, it should say required only on card details and name field
      checkoutPage.verify_requiredMessage_cardAndName()

      // now enter card details then click submit, it should say required only on name field
      checkoutPage.verify_requiredMessage_name()

      // now enter the name and there should not be any required error messages
      checkoutPage.verify_requiredMessage_none()
    });
    
    it('should validate user input', () => {
      //validate email field with incomplete email
      checkoutPage.validateEmail()

      //validate card number with wrong format card number
      checkoutPage.validatecardNumber()

      // validate card expiry with expired date
      checkoutPage.validatecardExpiry()

      // validate card cvc with two digits number
      checkoutPage.validatecardCvc()

      // validate postal code with wrong us postal code
      checkoutPage.validatepostalCode()
    });

    it('should disable form submission until form is valid', () => {
      cy.get(selectors.submitDisabled).should('exist')

      // enter email and check the submit button is still disabled
      cy.get(selectors.email).type('chiragverma@gmail.com');
      cy.get(selectors.submitDisabled).should('exist')

      // enter card number and check the submit button is still disabled
      cy.get(selectors.number).type('4242424242424242');
      cy.get(selectors.submitDisabled).should('exist')

      // enter card expiry and check the submit button is still disabled
      cy.get(selectors.cardExpiry).type('1128')
      cy.get(selectors.submitDisabled).should('exist')

      // enter cvc and check the submit button is still disabled
      cy.get(selectors.cardCvc).type('424');
      cy.get(selectors.submitDisabled).should('exist')

      // enter name and check the submit button is still disabled
      cy.get(selectors.name).type('Chirag Verma');
      cy.get(selectors.submitDisabled).should('exist')

      //after entering all the fields check it should not be disabled
      cy.get(selectors.postalCode).type('94043')
      cy.get(selectors.submitEnabled).should('exist')
    });
 });