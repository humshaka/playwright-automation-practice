/**
 * Test data for the SEP checkout flow.
 *
 * The business facts below were captured by inspecting the live SEP QA
 * application (Step 1 - Start Application). They drive assertions for the
 * relevant user stories and should be reviewed if the product content changes.
 */
export const product = {
  name: 'Test Automation with Selenium',
  // Upfront price shown on the information card (discounted from $500).
  upfrontPrice: '$400',
  originalPrice: '$500',
  discountNote: 'Save $100 when you pay upfront',
  flexiblePaymentsNote: 'Flexible payments plan available',
  programStartDate: 'Program Start Date Apr 10, 2025',
  refundPolicy: '100% refund policy until May 11, 2025',
};

/**
 * Personal details used to complete Step 1 of the checkout.
 * The email is referenced on the confirmation page after payment.
 */
export const personalDetails = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '5551234567',
};

/**
 * Stripe test card data used to complete the payment on Step 3.
 * These are Stripe's official test card numbers and never represent real
 * customer data.
 */
export const validCard = {
  number: '4242424242424242',
  expiration: '12/30',
  cvc: '123',
  zip: '12345',
};

/**
 * Invalid card data used to verify payment validation messages.
 */
export const invalidCard = {
  // Complete but fails Luhn validation -> "Your card number is invalid."
  number: '1234567890123456',
  // Short CVC -> "Your security code is incomplete."
  shortCvc: '12',
  // Expiration in the past -> "Your card's expiration year is in the past."
  pastExpiration: '12/20',
};

/**
 * The price summary shown on Step 3 for the Upfront plan.
 */
export const priceSummary = {
  productPrice: '$500',
  upfrontDiscount: '- $100',
  subtotal: '$400',
  processingFee: '$12',
  total: '$412',
};

/**
 * The payment plan options shown on Step 2.
 */
export const paymentPlans = {
  upfront: {
    title: 'Upfront',
    price: '$400',
    payOnceText: '$400 pay once',
    discount: '$100 Upfront discount',
  },
  installments: {
    title: '5 Installments',
    monthly: '$100 per month',
  },
};
