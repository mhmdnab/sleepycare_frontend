"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Wallet,
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";
import { useAuthStore } from "@/lib/store/auth";
import { formatPrice } from "@/lib/utils";
import { ordersApi, transactionsApi } from "@/lib/api/api";

// Lebanese Governorates
const LEBANESE_STATES = [
  "Akkar",
  "Baalbek-Hermel",
  "Beirut",
  "Beqaa",
  "Mount Lebanon",
  "Nabatieh",
  "North Lebanon",
  "South Lebanon",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Lebanon",
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const total = getTotalPrice();
  const shippingCost = total > 35 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + tax;

  // Redirect if cart is empty or not authenticated
  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      router.push("/shop");
    } else if (!isAuthenticated && !orderSuccess) {
      router.push("/auth/login?redirect=/checkout");
    }
  }, [items.length, orderSuccess, isAuthenticated, router]);

  // Show loading while redirecting
  if ((items.length === 0 || !isAuthenticated) && !orderSuccess) {
    return null;
  }

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo({ ...shippingInfo, [field]: value });
  };

  const handleCardChange = (field: string, value: string) => {
    let formattedValue = value;

    // Format card number with spaces
    if (field === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (formattedValue.length > 19) return;
    }

    // Format expiry date
    if (field === "expiryDate") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // Limit CVV to 4 digits
    if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardInfo({ ...cardInfo, [field]: formattedValue });
  };

  const validateForm = () => {
    const { fullName, email, phone, address, city, state } = shippingInfo;

    if (!fullName || !email || !phone || !address || !city || !state) {
      alert("Please fill in all shipping information");
      return false;
    }

    if (paymentMethod === "card") {
      const { cardNumber, cardHolder, expiryDate, cvv } = cardInfo;
      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        alert("Please fill in all card information");
        return false;
      }

      // Basic card validation
      const cardNumberClean = cardNumber.replace(/\s/g, "");
      if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
        alert("Invalid card number");
        return false;
      }

      if (cvv.length < 3) {
        alert("Invalid CVV");
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Create order
      const orderData = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      };

      const order = await ordersApi.create(orderData);

      // Create transaction
      const transactionData = {
        order_id: order.id,
        amount: finalTotal,
        payment_method:
          paymentMethod === "cash" ? "cash_on_delivery" : "credit_card",
        status: paymentMethod === "cash" ? "pending" : "completed",
        transaction_details:
          paymentMethod === "card"
            ? `Card ending in ${cardInfo.cardNumber.slice(-4)}`
            : "Cash on Delivery",
      };

      await transactionsApi.create(transactionData);

      // Send confirmation email
      try {
        await fetch("/api/orders/confirmation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order.id,
            customerName: shippingInfo.fullName,
            customerEmail: shippingInfo.email,
            items: items.map((item) => ({
              product_name: item.name,
              quantity: item.quantity,
              unit_price: item.price,
            })),
            subtotal: total,
            shipping: shippingCost,
            tax: tax,
            total: finalTotal,
            paymentMethod:
              paymentMethod === "cash" ? "cash_on_delivery" : "credit_card",
            shippingAddress: {
              fullName: shippingInfo.fullName,
              address: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
              phone: shippingInfo.phone,
            },
          }),
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the order if email fails
      }

      // Clear cart and show success
      clearCart();
      setOrderSuccess(true);

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push("/orders");
      }, 3000);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We'll send you a confirmation email
            shortly.
          </p>
          <Button onClick={() => router.push("/orders")} className="w-full">
            View My Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl lg:text-4xl font-pacifico text-gray-900">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) =>
                      handleShippingChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        handleShippingChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        handleShippingChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      handleShippingChange("address", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        handleShippingChange("city", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Governorate *
                    </label>
                    <select
                      value={shippingInfo.state}
                      onChange={(e) =>
                        handleShippingChange("state", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                      required
                    >
                      <option value="">Select Governorate</option>
                      {LEBANESE_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.country}
                    onChange={(e) =>
                      handleShippingChange("country", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Payment Method
              </h2>

              <div className="space-y-4 mb-6">
                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`w-full p-4 border-2 rounded-xl flex items-center justify-between transition-all ${
                    paymentMethod === "cash"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                        paymentMethod === "cash"
                          ? "bg-primary-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <Wallet
                        className={`w-6 h-6 ${
                          paymentMethod === "cash"
                            ? "text-primary-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cash"
                        ? "border-primary-500 bg-primary-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cash" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </button>

                {/* Credit Card */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 border-2 rounded-xl flex items-center justify-between transition-all ${
                    paymentMethod === "card"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                        paymentMethod === "card"
                          ? "bg-primary-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <CreditCard
                        className={`w-6 h-6 ${
                          paymentMethod === "card"
                            ? "text-primary-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">
                        Credit/Debit Card
                      </p>
                      <p className="text-sm text-gray-600">
                        Visa, Mastercard, or American Express
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "card"
                        ? "border-primary-500 bg-primary-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </button>
              </div>

              {/* Card Details Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.cardNumber}
                      onChange={(e) =>
                        handleCardChange("cardNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.cardHolder}
                      onChange={(e) =>
                        handleCardChange("cardHolder", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.expiryDate}
                        onChange={(e) =>
                          handleCardChange("expiryDate", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cvv}
                        onChange={(e) =>
                          handleCardChange("cvv", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mt-4">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Your payment information is secure and encrypted
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(tax)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-t-2 border-gray-200">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
