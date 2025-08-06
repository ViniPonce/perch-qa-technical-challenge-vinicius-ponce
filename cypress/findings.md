# Findings

This document contains detected issues, bugs, and improvement suggestions found during the testing process.

---

## 1. Address Page

**Issue:**  
Form fields `Country`, `City`, and `State` return a confusing error when input has only 1 letter.

**Current message:**  
- "Country must contain only letters and spaces"
- "City must contain only letters and spaces"
- "State must contain only letters and spaces"

**Suggestion:**  
Use more specific validation messages. For example:
- "Country must be at least 2 characters and contain only letters and spaces"

---

## 2. Payment Page

### 2.1 Button Label
**Issue:**  
The final purchase button has the class `add-to-cart-button`, which is misleading.

**Suggestion:**  
Rename it to `place-order-button` or a more semantically meaningful name.

### 2.2 Expiry Date Validation
**Issue:**  
The expiry date accepts a year **before the current year**, which shouldn't be allowed.

**Suggestion:**  
Add validation to prevent expired card inputs and show a relevant error message like:
- "Card expiry date must be in the future"

---

## 3. Homepage

### 3.1 Duplicate Card Names
**Issue:**  
When searching for a product with duplicate names, only one appears in the UI. The other becomes unreachable via automation.

**Suggestion:**  
Ensure all matching results are rendered or avoid duplicating names.

### 3.2 Sorting by Price
**Issue:**  
"Sort by Price" does not work correctly. Products appear in an incorrect or unordered sequence.

**Suggestion:**  
Fix the sorting logic so that items are ordered numerically by price (ascending or descending).

---

## 4. Cart Page

**Issue:**  
Items stored in `localStorage` under `'shopping-cart'` are **not rendered** in the Cart page.

**Impact:**  
Preloading the cart for testing becomes impossible (mocking doesn't work).

**Suggestion:**  
Make the Cart page read from `localStorage` on load to allow mocking data in tests.

---

## 5. Success Page

**Issue:**  
Similar to Cart, the Success page does **not render order data** even when `localStorage` is populated.

**Suggestion:**  
Update the page to load order data from `localStorage` so that tests can verify content after a mocked purchase.

---

### ✅ Summary

These issues impact both user experience and testability. Fixing them would improve reliability, UI feedback, and ease of automation.



# 📝 UX/UI Findings


## ✅ 1. Success Page (Checkout Complete)

**Suggestions:**
- Add a stronger visual confirmation (e.g. animated checkmark or icon) to reinforce purchase success.
- Display the **order number** clearly for user reference and tracking.
- Improve **text contrast** for better readability across all devices.
- Make action buttons ("Go to Profile", "Back to Shop") more visually prominent (larger size, more contrast).
- Include a **link to order tracking** or detailed receipt.

---

## ✅ 2. Empty Cart Page

**Suggestions:**
- Add a clear **call-to-action** (e.g. “Continue Shopping” button).
- Include a friendly illustration or icon to enhance emotional UX.
- Consider a more engaging message like: _“Your cart is empty 😢 Let’s fix that!”_

---

## ✅ 3. Cart with Items

**Suggestions:**
- Replace or supplement the “Remove” text with a **trash icon** for quicker visual recognition.
- Highlight **subtotal and total** with bold or colored text for clarity.
- Allow users to **manually input quantity** (instead of just + / - buttons).
- Optionally display an **estimated shipping cost** if relevant.

---

## ✅ 4. Order History / Past Orders

**Suggestions:**
- Use **colored status labels** (e.g. green for "Delivered", blue for "Processing") to help users quickly scan their order statuses.
- Add a “Reorder” or “View Details” button for convenience.
- Improve spacing between orders to enhance readability.
- Consider adding **filters or sorting options** (e.g. by date or status).

---

## ✅ 5. Edit Profile

**Suggestions:**
- Add **inline field validation** (e.g. invalid email format alerts immediately).
- Mark required fields clearly (e.g. with a red asterisk).
- Include a **“Cancel” button** to discard changes.
- Show a **success message** after saving (e.g. “Profile updated successfully”).

---

## ✅ 6. Profile View

**Suggestions:**
- Display a **user greeting or name** prominently (e.g. “Hello, John!”).
- Allow uploading a **profile picture** to personalize the account.
- Improve layout with **visual grouping** (e.g. use cards or more padding between sections).
- Provide **quick links** to edit profile or view order history.
