import { test, expect } from '../fixtures.js';
import { product } from '../data/sepTestData.js';
import { openCheckout } from '../utils/navigation.js';

// User Story: SEP-11
// Requirement: As a customer, I want to see the program start dates and refund
// policy details before enrolling so that I can make informed decisions.
// Acceptance criteria:
//   1. Program Start date and refund dates must be displayed in step one.
//   2. The displayed dates must be correct.
test.describe('SEP-11: Program start dates and refund dates', () => {
  test.beforeEach(async ({ page }) => {
    await openCheckout(page);
  });

  test('SEP-11: displays the program start date', async ({ appPage }) => {
    await expect(appPage.programStartDate).toBeVisible();
    await expect(appPage.programStartDate).toContainText(
      product.programStartDate
    );
  });

  test('SEP-11: displays the refund policy with the final refund date', async ({
    appPage,
  }) => {
    await expect(appPage.refundPolicy).toBeVisible();
    await expect(appPage.refundPolicy).toContainText(product.refundPolicy);
  });
});
