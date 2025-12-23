import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
}

interface OrderConfirmationRequest {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    console.log("🔔 Received order confirmation email request");
    const body = (await request.json()) as OrderConfirmationRequest;
    console.log("📧 Sending order confirmation email to:", body.customerEmail);

    // Validate required fields
    if (
      !body.orderId ||
      !body.customerEmail ||
      !body.items ||
      body.items.length === 0
    ) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customerEmail)) {
      console.error("❌ Invalid email format:", body.customerEmail);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("📨 Calling Resend API...");

    const itemsHtml = body.items
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; text-align: left;">${
            item.product_name
          }</td>
          <td style="padding: 12px 0; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 0; text-align: right;">$${(
            item.unit_price * item.quantity
          ).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const shippingAddress = body.shippingAddress;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "SleepyCare <onboarding@resend.dev>";

    // Send confirmation email to customer
    const response = await resend.emails.send({
      from: fromEmail,
      to: body.customerEmail,
      subject: `Order Confirmation - Order #${body.orderId.slice(0, 8)}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 8px 8px; }
              .order-section { background: white; padding: 20px; margin: 15px 0; border-radius: 6px; border: 1px solid #e5e7eb; }
              .section-title { font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 12px; }
              .items-table { width: 100%; border-collapse: collapse; }
              .items-table th { text-align: left; padding: 12px 0; border-bottom: 2px solid #667eea; color: #1f2937; font-weight: bold; }
              .price-row { display: flex; justify-content: space-between; padding: 8px 0; }
              .price-label { color: #6b7280; }
              .price-value { color: #1f2937; font-weight: 500; }
              .total-row { display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #667eea; border-bottom: 2px solid #667eea; margin: 15px 0; }
              .total-label { font-size: 18px; font-weight: bold; color: #1f2937; }
              .total-value { font-size: 24px; font-weight: bold; color: #667eea; }
              .button { background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 15px; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
              .address-box { background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 10px 0; }
              .status-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Order Confirmation</h1>
                <p style="margin: 5px 0 0 0;">Thank you for your purchase!</p>
              </div>

              <div class="content">
                <p>Hi ${body.customerName},</p>
                <p>We've received your order and it's being prepared for shipment. Here are your order details:</p>

                <!-- Order Details -->
                <div class="order-section">
                  <div class="section-title">Order Information</div>
                  <div class="price-row">
                    <span class="price-label">Order Number:</span>
                    <span class="price-value">#${body.orderId}</span>
                  </div>
                  <div class="price-row">
                    <span class="price-label">Order Date:</span>
                    <span class="price-value">${new Date().toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}</span>
                  </div>
                  <div class="price-row">
                    <span class="price-label">Payment Method:</span>
                    <span class="price-value">${
                      body.paymentMethod === "cash_on_delivery"
                        ? "Cash on Delivery"
                        : "Credit Card"
                    }</span>
                  </div>
                  <div style="margin-top: 15px;">
                    <span class="status-badge">✓ Order Confirmed</span>
                  </div>
                </div>

                <!-- Items -->
                <div class="order-section">
                  <div class="section-title">Items Ordered</div>
                  <table class="items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th style="text-align: center;">Quantity</th>
                        <th style="text-align: right;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                  </table>
                </div>

                <!-- Price Breakdown -->
                <div class="order-section">
                  <div class="price-row">
                    <span class="price-label">Subtotal:</span>
                    <span class="price-value">$${body.subtotal.toFixed(
                      2
                    )}</span>
                  </div>
                  <div class="price-row">
                    <span class="price-label">Shipping:</span>
                    <span class="price-value">${
                      body.shipping === 0
                        ? "FREE"
                        : "$" + body.shipping.toFixed(2)
                    }</span>
                  </div>
                  <div class="price-row">
                    <span class="price-label">Tax (8%):</span>
                    <span class="price-value">$${body.tax.toFixed(2)}</span>
                  </div>
                  <div class="total-row">
                    <span class="total-label">Total:</span>
                    <span class="total-value">$${body.total.toFixed(2)}</span>
                  </div>
                </div>

                <!-- Shipping Address -->
                <div class="order-section">
                  <div class="section-title">Shipping Address</div>
                  <div class="address-box">
                    <strong>${shippingAddress.fullName}</strong><br>
                    ${shippingAddress.address}<br>
                    ${shippingAddress.city}, ${shippingAddress.state}<br>
                    ${shippingAddress.country}<br>
                    <br>
                    <strong>Phone:</strong> ${shippingAddress.phone}
                  </div>
                </div>

                <!-- Next Steps -->
                <div class="order-section">
                  <div class="section-title">What's Next?</div>
                  <p>Your order will be prepared and shipped within 2-3 business days. You'll receive a tracking number via email once your order ships.</p>
                  <p>If you have any questions about your order, feel free to contact us at support@sleepycare.com or call +1 (123) 456-7890.</p>
                </div>

                <div style="text-align: center;">
                  <a href="https://sleepycarelb.com/orders" class="button">Track Your Order</a>
                </div>

                <div class="footer">
                  <p>SleepyCare | 2024..</p>
                  <p>You received this email because you placed an order on SleepyCare.com</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("✅ Resend API response:", JSON.stringify(response, null, 2));

    if (!response || response.error) {
      console.error("❌ Resend API error:", response?.error);
      return NextResponse.json(
        {
          error: "Failed to send confirmation email",
          details: response?.error,
        },
        { status: 500 }
      );
    }

    console.log(
      "✅ Order confirmation email sent successfully to:",
      body.customerEmail
    );
    console.log("📬 Email ID:", response.data?.id);

    return NextResponse.json(
      {
        success: true,
        message: "Confirmation email sent successfully",
        emailId: response.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Order confirmation email error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
