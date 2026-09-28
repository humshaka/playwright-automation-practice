import { product } from '../data/sepTestData.js';

/**
 * Page Object for the payment confirmation page shown after a successful
 * payment (SEP-23).
 */
export class ConfirmationPage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByText('Payments confirmation');
    this.successMessage = page.getByText(/You successfully signed up for/);
    this.onboardingHeading = page.getByText('Onboarding');
    // Exact match to avoid matching "support@cydeo.com" in the same section.
    this.supportHeading = page.getByText('Support', { exact: true });
  }

  /**
   * The confirmation message that includes the program name and the
   * customer's email address.
   */
  confirmationMessageFor(email) {
    return this.page.getByText(
      new RegExp(`You successfully signed up for ${product.name}. Your receipt will be send to ${email}.`)
    );
  }
}
