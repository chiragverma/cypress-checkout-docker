//---This test is to verify authentication fail appears on the checkout page
//---Mocking Stripe APIs to mock the response as authentication failed
//---To avoid depending on the API responses and remove the flakiness of the tests we will take full control of stripe APIs by using mocking
import '../../support/commands.js';

const url = ("https://checkout.stripe.dev/api/demo-session?country=us&billingPeriod=monthly&hasBgColor=false&hasBillingAndShipping=false&hasCoupons=false&hasFreeTrial=false&hasShippingRate=false&hasTaxes=false&mode=payment&wallet=googlePay&hasPolicies=false&billingType=flat")

describe('Stripe Payment Authentication Fails', () => {
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
      
    // mocking confirm payment method endpoint
    cy.intercept('POST', 'https://api.stripe.com/v1/payment_pages/*/confirm', (req) => {
      req.reply({
      statusCode: 200,
      fixture: 'confirm-auth-response.json' //file with mocked response
      })})
  });

  it('Should display authentication fail message after payment form submit', () => {
      // fill out all the checkout form fields
      cy.fillCheckout()
      //assert if the authentication fail message appears
      cy.contains('We are unable to authenticate your payment method. Please choose a different payment method and try again.')    
})
});