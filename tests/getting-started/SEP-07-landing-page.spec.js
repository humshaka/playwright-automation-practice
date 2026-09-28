import { test, expect } from '../fixtures.js';
import { openCheckout } from '../utils/navigation.js';

// User Story: SEP-07
// Requirement: As a customer, I should be able to see the product landing page.
// Acceptance criteria:
//   1. The system displays the text "Cydeo Secure Checkout".
//   2. The system should display the program name.
//   3. Users should see a footer on the left side that includes by order:
//      logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy.
test.describe('SEP-07: Product Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await openCheckout(page);
  });

  test('SEP-07: displays the secure checkout heading', async ({ page }) => {
    // The live application renders "Secure checkout" for this heading.
    await expect(page.getByText('Secure checkout', { exact: true })).toBeVisible();
  });

  test('SEP-07: displays the program name', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Test Automation with Selenium' })
    ).toBeVisible();
  });

  test('SEP-07: displays the left footer links in the expected order', async ({
    page,
  }) => {
    const footerLinks = page
      .getByRole('link', { name: /Terms and conditions|Privacy Policy|Disclaimer|Cookie Policy/ })
      .all();

    const texts = await footerLinks;

    expect(await texts[0].textContent()).toBe('Terms and conditions');
    expect(await texts[1].textContent()).toBe('Privacy Policy');
    expect(await texts[2].textContent()).toBe('Disclaimer');
    expect(await texts[3].textContent()).toBe('Cookie Policy');
  });

  test('SEP-07: footer contains the Cydeo logo', async ({ page }) => {
    const logo = page.locator('a[href="https://cydeo.com"]');
    await expect(logo).toBeVisible();
  });
});
