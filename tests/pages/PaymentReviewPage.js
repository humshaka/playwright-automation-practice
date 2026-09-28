import { validCard, priceSummary } from '../data/sepTestData.js';

/**
 * Page Object for Step 3 - "Review" (payment).
 *
 * The card fields live inside a Stripe payment iframe, so they are accessed
 * through a FrameLocator. The iframe name is generated at runtime, therefore
 * we target it by CSS selector rather than by its dynamic name.
 */
export class PaymentReviewPage {
  constructor(page) {
    this.page = page;

    // Stripe payment iframe. Stripe loads several hidden iframes (Google Pay,
    // Apple Pay, metrics, etc.), so we target the one that hosts the card
    // fields by its stable title attribute.
    this.frame = page.frameLocator('iframe[title="Secure payment input frame"]');

    // Card fields (inside the iframe)
    this.cardNumber = this.frame.getByRole('textbox', { name: 'Card number' });
    // The expiration field label alternates between "Expiration date" and
    // "Expiration (MM/YY)" depending on its state, so match loosely.
    this.expiration = this.frame.getByRole('textbox', { name: /Expiration/ });
    this.securityCode = this.frame.getByRole('textbox', { name: 'Security code' });
    this.country = this.frame.getByRole('combobox', { name: 'Country' });
    this.zip = this.frame.getByRole('textbox', { name: 'ZIP code' });

    // Price summary (outside the iframe)
    this.productPrice = page.getByText(priceSummary.productPrice);
    this.upfrontDiscount = page.getByText(priceSummary.upfrontDiscount);
    this.subtotal = page.getByText(priceSummary.subtotal);
    this.processingFee = page.getByText(priceSummary.processingFee);
    this.total = page.getByText(priceSummary.total);

    // Terms & Pay
    this.termsCheckbox = page.getByRole('checkbox', {
      name: /Terms and Conditions/,
    });
    this.payButton = page.getByRole('button', { name: 'Pay' });
    // A hidden "Back" element can precede the visible one; target the visible.
    this.backButton = page.getByText('Back', { exact: true }).locator('visible=true');
  }

  /**
   * Fills the payment card fields with valid Stripe test data.
   */
  async fillCard(card = validCard) {
    await this.cardNumber.fill(card.number);
    await this.expiration.fill(card.expiration);
    await this.securityCode.fill(card.cvc);
    await this.zip.fill(card.zip);
  }

  /**
   * Accepts the terms and conditions.
   */
  async acceptTerms() {
    await this.termsCheckbox.check();
  }

  /**
   * Completes the payment using the supplied (default: valid) card data.
   */
  async pay(card = validCard) {
    await this.fillCard(card);
    await this.acceptTerms();
    await this.payButton.click();
  }
}
