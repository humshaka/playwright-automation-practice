import { test, expect } from '../fixtures.js';

// User Story: SEP-14
// Requirement: As a customer, I want to choose a payment plan from the
// available options so that I can choose the one that best suits my needs.
// Acceptance criteria:
//   1. On first load, no plan is selected and the Next button is disabled.
//   2. Selecting a plan highlights that option to indicate selection.
//   3. Selecting a pricing option activates the Next button.
//   4. Users can change their plan selection before finalizing.
test.describe('SEP-14: Selecting a payment plan', () => {
  test('SEP-14: Next button is disabled when no plan is selected', async ({
    goToPaymentPlan,
    paymentPlanPage,
  }) => {
    await goToPaymentPlan();
    await expect(paymentPlanPage.nextButton).toBeDisabled();
  });

  test('SEP-14: selecting a plan activates the Next button', async ({
    goToPaymentPlan,
    paymentPlanPage,
  }) => {
    await goToPaymentPlan();
    await paymentPlanPage.selectUpfrontPlan();
    await expect(paymentPlanPage.nextButton).toBeEnabled();
  });

  test('SEP-14: highlights the selected plan', async ({
    goToPaymentPlan,
    paymentPlanPage,
  }) => {
    await goToPaymentPlan();
    await paymentPlanPage.selectUpfrontPlan();
    await expect(paymentPlanPage.upfrontPlan).toHaveAttribute('aria-expanded', 'true');
  });

  test('SEP-14: allows changing the selected plan', async ({
    goToPaymentPlan,
    paymentPlanPage,
  }) => {
    await goToPaymentPlan();
    await paymentPlanPage.selectUpfrontPlan();
    await paymentPlanPage.selectPlan('5 Installments');

    await expect(paymentPlanPage.installmentsPlan).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    await expect(paymentPlanPage.nextButton).toBeEnabled();
  });
});
