export async function authenticateShiprocket() {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password || email === 'your_shiprocket_email@example.com') {
    console.warn('Shiprocket credentials are not configured in .env.local');
    return null;
  }

  try {
    const res = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      throw new Error('Failed to authenticate with Shiprocket');
    }

    const data = await res.json();
    return data.token; // Bearer token
  } catch (error) {
    console.error('Shiprocket Auth Error:', error);
    return null;
  }
}

export async function createShiprocketOrder(order: any, token: string) {
  try {
    const payload = {
      order_id: order.orderId,
      order_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      pickup_location: "Primary",
      billing_customer_name: order.shippingAddress.name,
      billing_last_name: "",
      billing_address: order.shippingAddress.addressLine1,
      billing_address_2: "",
      billing_city: order.shippingAddress.city,
      billing_pincode: order.shippingAddress.pincode,
      billing_state: order.shippingAddress.state,
      billing_country: "India",
      billing_email: order.customerEmail || "customer@example.com",
      billing_phone: order.customerDetails?.phone || "9999999999",
      shipping_is_billing: true,
      order_items: order.lineItems.map((item: any) => ({
        name: item.productName,
        sku: item.productId.toString(),
        units: item.quantity,
        selling_price: item.price,
        discount: "",
        tax: "",
        hsn: ""
      })),
      payment_method: order.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: order.amount,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 1
    };

    const res = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Shiprocket Create Order Error:', error);
    return null;
  }
}
