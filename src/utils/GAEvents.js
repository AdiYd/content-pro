/**
 * Function to trigger a Google Analytics event.
 * @param {string} action - The type of interaction (e.g., 'button_click', 'form_submit', 'purchase').
 * @param {string} category - The category of the event (e.g., 'Button', 'Form', 'Ecommerce').
 * @param {string} label - A label to differentiate events (e.g., 'Subscribe Button', 'Contact Form', 'Course Purchase').
 * @param {number} value - A numerical value associated with the event (e.g., the price of the product purchased).
 */
export function trackEvent(action, category, label, value) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

/**
 * Function to track a button click event in Google Analytics.
 * @param {string} label - A label to describe the button clicked (e.g., 'Subscribe Button').
 */
export function trackButtonClick(label) {
  trackEvent('button_click', 'Button', label, 1);
}

/**
 * Function to track a form submission event in Google Analytics.
 * @param {string} label - A label to describe the form submitted (e.g., 'Contact Form').
 */
export function trackFormSubmission(label) {
  trackEvent('form_submit', 'Form', label, 1);
}

/**
 * Function to track a purchase event in Google Analytics.
 * @param {string} transactionId - The unique transaction ID for the purchase.
 * @param {number} value - The total value of the purchase.
 * @param {string} currency - The currency in which the transaction was made (e.g., 'USD').
 * @param {Array} items - An array of objects representing the items purchased. Each object should have 'id', 'name', 'quantity', and 'price'.
 */
export function trackPurchase(transactionId, value, currency, items) {
  trackEvent('purchase', 'Ecommerce', `Transaction: ${transactionId}`, value);
  currency = currency || 'ILS';
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items,
    });
  }
}

/**
 * Example usage:
 *
 * // Track a button click
 * trackButtonClick('Subscribe Button');
 *
 * // Track a form submission
 * trackFormSubmission('Contact Form');
 *
 * // Track a purchase
 * trackPurchase('12345', 99.99, 'USD', [
 *   { id: 'item1', name: 'Course Video-pro', quantity: 1, price: 99.99 }
 * ]);
 */

export default {
  trackButtonClick,
  trackFormSubmission,
  trackPurchase,
};
