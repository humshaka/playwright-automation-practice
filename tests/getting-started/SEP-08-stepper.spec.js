import { test, expect } from '../fixtures.js';
import { openCheckout } from '../utils/navigation.js';

// User Story: SEP-08
// Requirement: As a customer, I should be able to know where I am in the
// checkout process using the stepper.
// Acceptance criteria:
//   1. The steps are displayed as "1-Start Application", "2-Payment Plan",
//      and "3-Review".
//   2. "Start Application" is highlighted in blue.
//   3. "Payment Plan" and "Review" are shown in grey.
test.describe('SEP-08: Checkout process stepper', () => {
  test.beforeEach(async ({ page }) => {
    await openCheckout(page);
  });

  test('SEP-08: displays all three checkout steps', async ({ appPage }) => {
    await expect(appPage.stepStartApplication).toBeVisible();
    await expect(appPage.stepPaymentPlan).toBeVisible();
    await expect(appPage.stepReview).toBeVisible();
  });

  test('SEP-08: highlights Start Application as the active step', async ({
    page,
  }) => {
    // The active step is visually distinct from the upcoming steps. We compare
    // the computed color of the active step label against an upcoming one.
    const activeColor = await page
      .getByText('Start Application')
      .evaluate((el) => getComputedStyle(el.closest('[class*="step"]') || el).color);
    const upcomingColor = await page
      .getByText('Review')
      .evaluate((el) => getComputedStyle(el.closest('[class*="step"]') || el).color);

    expect(activeColor).not.toBe(upcomingColor);
  });
});
