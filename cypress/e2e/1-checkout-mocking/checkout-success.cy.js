//---This test is to verify payment success message appears on the checkout page
//---Mocking Stripe APIs to mock the response as success
//---To avoid depending on the API responses and remove the flakiness of the tests we will take full control of stripe APIs by using mocking
import '../../support/commands.js';
import selectors from '../../support/selectors.js';

const url = ("https://checkout.stripe.dev/api/demo-session?country=us&billingPeriod=monthly&hasBgColor=false&hasBillingAndShipping=false&hasCoupons=false&hasFreeTrial=false&hasShippingRate=false&hasTaxes=false&mode=payment&wallet=googlePay&hasPolicies=false&billingType=flat")

describe('Stripe Payment Success', () => {
  beforeEach(() => {
    cy.request(url).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("url");
      cy.visit(response.body.url);
      cy.url().should("contains", "https://checkout.stripe.com/pay/");
    });

    // mocking payment method endpoint
    cy.intercept('POST', 'https://api.stripe.com/v1/payment_methods', (req) => {
      req.reply({
      statusCode: 200,
      fixture: 'payment-method-response.json' //file with mocked response
      })})

    // mocking the confirm payment endpoint
    cy.intercept('POST', 'https://api.stripe.com/v1/payment_pages/*/confirm', (req) => {
      req.reply({
      statusCode: 200,
      fixture: 'confirm-pass-response.json' //file with mocked response
      })})

  });

  it('Should display payment success message after payment form submit', () => {
      // fill out all the form fields
      cy.fillCheckout()
      //check if the success checkmark appears
      cy.get(selectors.successButton).should('exist')

})
});