import { test as base } from '@playwright/test';
import { ApplicationPage } from './pages/ApplicationPage.js';
import { PaymentPlanPage } from './pages/PaymentPlanPage.js';
import { PaymentReviewPage } from './pages/PaymentReviewPage.js';
import { ConfirmationPage } from './pages/ConfirmationPage.js';
import { openCheckout } from './utils/navigation.js';

/**
 * Extends Playwright's test with Page Objects for each checkout step.
 *
 * Using fixtures keeps tests readable and removes duplicated page-object
 * construction and navigation logic.
 */
export const test = base.extend({
  appPage: async ({ page }, use) => {
    await use(new ApplicationPage(page));
  },
  paymentPlanPage: async ({ page }, use) => {
    await use(new PaymentPlanPage(page));
  },
  paymentReviewPage: async ({ page }, use) => {
    await use(new PaymentReviewPage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },

  /**
   * Reaches Step 2 by completing Step 1 with the given details.
   */
  goToPaymentPlan: async ({ page, appPage }, use) => {
    await use(async (details) => {
      await openCheckout(page);
      await appPage.completeStepOne(details);
    });
  },

  /**
   * Reaches Step 3 (Review) by completing Steps 1 and 2.
   */
  goToReview: async ({ goToPaymentPlan, paymentPlanPage }, use) => {
    await use(async (details, plan = 'Upfront') => {
      await goToPaymentPlan(details);
      await paymentPlanPage.selectPlan(plan);
      await paymentPlanPage.nextButton.click();
    });
  },
});

export { expect } from '@playwright/test';
