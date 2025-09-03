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
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim() || "test",
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

    const order = await response.json();
    return order.id;
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
