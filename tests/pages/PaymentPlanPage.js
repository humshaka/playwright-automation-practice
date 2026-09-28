import { paymentPlans } from '../data/sepTestData.js';

/**
 * Page Object for Step 2 - "Payment Plan".
 * Displays the available payment plans and lets the customer pick one.
 */
export class PaymentPlanPage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByText('Choose a payment plan');

    // Payment plan accordions (selected by their accessible names)
    this.upfrontPlan = page.getByRole('button', { name: /Upfront/ });
    this.installmentsPlan = page.getByRole('button', { name: /Installments/ });

    // Expanded plan details (Upfront)
    this.basePrice = page.getByText('Base price');
    this.upfrontDiscount = page.getByText('Upfront discount');
    this.promoCodeButton = page.getByRole('button', { name: 'I have a promo code' });

    this.backButton = page.getByText('Back', { exact: true }).locator('visible=true');
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  /**
   * Selects a payment plan by its title (e.g. "Upfront" or "5 Installments").
   */
  async selectPlan(planName) {
    await this.page.getByRole('button', { name: new RegExp(planName) }).click();
  }

  /**
   * Selects the Upfront plan and returns to the caller for assertions.
   */
  async selectUpfrontPlan() {
    await this.upfrontPlan.click();
  }
}
