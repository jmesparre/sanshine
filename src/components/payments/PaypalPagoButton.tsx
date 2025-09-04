"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Service } from "@/types";

interface PaypalPagoButtonProps {
  amount: string;
  currency: string;
  serviceName: string;
  service: Service;
}

const PaypalPagoButton: React.FC<PaypalPagoButtonProps> = ({ amount, currency, serviceName, service }) => {
  const router = useRouter();
  const { user, promptLogin } = useAuth();

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.replace(/\s/g, "") || "test",
    currency: currency,
    intent: "capture",
  };

  const createOrder = async () => {
    if (!user) {
      promptLogin();
      throw new Error("User not logged in");
    }

    // 1. Create order in Firestore
    const orderRef = await addDoc(collection(db, "orders"), {
      userId: user.uid,
      userName: user.displayName || 'No Name',
      userEmail: user.email || 'No Email',
      serviceId: service.id,
      serviceName: service.leftColumn.title,
      amount: parseFloat(amount),
      currency: currency,
      status: "pending",
      paymentMethod: "paypal",
      createdAt: serverTimestamp(),
    });

    // 2. Create PayPal order
    try {
      const response = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderRef.id,
          serviceName,
          amount,
          currency,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`API Error: ${errorDetails.error || response.statusText}`);
      }

      const order = await response.json();
      console.log("Created PayPal Order:", order);
      return order.id;
    } catch (error) {
      console.error("Failed to create PayPal order:", error);
      // Re-throw the error to be caught by PayPal's onError
      throw error;
    }
  };

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    if (actions.order) {
      return actions.order.capture().then(() => {
        router.push('/pago-exitoso');
      });
    }
    return Promise.resolve();
  };

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal Error:", err);
    router.push('/pago-fallido');
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalPagoButton;
