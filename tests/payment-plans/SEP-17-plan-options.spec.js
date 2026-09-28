import { test, expect } from '../fixtures.js';

// User Story: SEP-17
// Requirement: As a customer, I should be able to see payment plan options in
// Step 2.
// Acceptance criteria:
//   1. Upfront payment:
//      1.1 There is only one upfront price.
//      1.2 Text is "Upfront" (first row) and "$ <upfront_price> pay once"
//          (second row).
//   2. Installment plans:
//      2.1 There must be total plans listed.
//      2.2 There can be a number of installments.
//      2.3 If installments, the text is "<number> Installments" (first row)
//          and "$ <monthly_price> per month" (second row).
//      2.4 Installment plans should be unique.
test.describe('SEP-17: View payment plan options in Step 2', () => {
  test('SEP-17: shows the upfront plan with a single price', async ({
    goToPaymentPlan,
    paymentPlanPage,
  }) => {
    await goToPaymentPlan();
    await expect(paymentPlanPage.upfrontPlan).toBeVisible();
    await expect(paymentPlanPage.upfrontPlan).toContainText('Upfront');
    await expect(paymentPlanPage.upfrontPlan).toContainText('$400 pay once');
  });

  test('SEP-17: shows installment plans with per-month pricing', async ({
    goToPaymentPlan,
    paymentPlanPage,
  }) => {
    await goToPaymentPlan();
    await expect(paymentPlanPage.installmentsPlan).toBeVisible();
    await expect(paymentPlanPage.installmentsPlan).toContainText('5 Installments');
    await expect(paymentPlanPage.installmentsPlan).toContainText('$100 per month');
  });

  test('SEP-17: lists unique payment plan options', async ({
    goToPaymentPlan,
    paymentPlanPage,
  }) => {
    await goToPaymentPlan();
    const planTitles = await paymentPlanPage.page
      .getByRole('button', { name: /Upfront|Installments/ })
      .allTextContents();

    const titles = planTitles.map((t) => t.trim());
    // No two plan options share the same accessible name.
    expect(new Set(titles).size).toBe(titles.length);
  });
});
