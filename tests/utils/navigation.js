import { BASE_URL } from './env.js';

/**
 * Navigates to the SEP checkout application root.
 *
 * NOTE: the checkout lives at the full SEP_QA_URL path (e.g. /taws). A plain
 * `page.goto('/')` would resolve to the origin root and be redirected to the
 * public marketing site, so we always navigate to the configured base URL.
 */
export async function openCheckout(page) {
  await page.goto(BASE_URL);
}
