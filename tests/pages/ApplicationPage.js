import { product, personalDetails } from '../data/sepTestData.js';

/**
 * Page Object for Step 1 - "Start Application".
 * Displays the product information and the personal details form.
 */
export class ApplicationPage {
  constructor(page) {
    this.page = page;

    // Stepper labels (exact match avoids matching "Choose a payment plan", etc.)
    this.stepStartApplication = page.getByText('Start Application', { exact: true });
    this.stepPaymentPlan = page.getByText('Payment plan', { exact: true });
    this.stepReview = page.getByText('Review', { exact: true });

    // Product information card. The product name appears in several places
    // (left program link, mobile row, summary), so we target the card title
    // via its stable, non-generated class.
    this.productName = page.locator('p.program-title');
    // Exact match distinguishes the card price from "$400 pay once".
    this.upfrontPrice = page.getByText(product.upfrontPrice, { exact: true });
    this.discountNote = page.getByText(product.discountNote);
    this.flexiblePaymentsNote = page.getByText(product.flexiblePaymentsNote);
    this.programStartDate = page.getByText(product.programStartDate);
    this.refundPolicy = page.getByText(product.refundPolicy);

    // Personal details form
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.email = page.getByRole('textbox', { name: 'Email Address' });
    this.phone = page.getByRole('textbox', { name: 'Phone' });
    this.referralSource = page.getByRole('combobox', {
      name: 'How did you hear about us?',
    });
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  /**
   * Fills the required personal details fields.
   */
  async fillPersonalDetails(details = personalDetails) {
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);
    await this.email.fill(details.email);
    await this.phone.fill(details.phone);
  }

  /**
   * Completes Step 1 with the provided (or default) details.
   */
  async completeStepOne(details = personalDetails) {
    await this.fillPersonalDetails(details);
    await this.nextButton.click();
  }
}
