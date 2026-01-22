
/**
 * FRONTEND SERVICE - WEB PORTAL SIDE
 */

// Updated to the new deployment link provided by the user
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxlq3elWRe_l2DjSXcV_zejMCSCHvuMnWeYuvRkS_ZrAYxrCcDO-5iT14A-6SseuDM5aA/exec';

export const submitToGoogleSheets = async (order: any): Promise<boolean> => {
  try {
    if (!GOOGLE_SCRIPT_URL) return false;

    // Map each item in the order to a row (21 columns)
    // CRITICAL: The 'Branch' key value MUST be the branch name (Mumbai, Delhi, etc.)
    // because your Apps Script uses var branchName = row['Branch']; to find the tab.
    const payload = order.items.map((item: any) => ({
      'Timestamp': new Date().toLocaleString('en-IN'),
      'Customer PO': order.customerPONo || 'N/A',
      'Customer Name': order.customer?.name || 'N/A',
      'Customer Email': order.customer?.email || 'N/A',
      'Order Date': order.orderDate,
      'Unit': item.category, // This is the Product Unit/Category (e.g., CKU, WARP)
      'Item Name': item.itemName,
      'Color': item.color || 'STD',
      'Width': item.width || 'STD',
      'Unit (of item)': item.uom,
      'Qty': item.quantity,
      'Rate': item.rate,
      'Discount': item.discount || 0,
      'Delivery Date': item.deliveryDate,
      'Remark': item.remark || '',
      'Customer Number': order.customer?.contact_no || 'N/A',
      'Billing Address': order.billingAddress || 'N/A',
      'Delivery Address': order.deliveryAddress || 'N/A',
      'Transporter Name': item.transportName || 'N/A',
      'Sales Person Name': order.salesPerson,
      'Account Status': order.accountStatus || 'Active',
      'Branch': order.branch // THIS IS THE BRANCH NAME for the Sheet Tab
    }));

    // mode: 'no-cors' is used because Apps Script doesn't return standard CORS headers
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error('Google Sheets Submission Error:', error);
    return false;
  }
};
