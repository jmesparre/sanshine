"use client";

import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Service } from "@/types";

interface PaymentButtonProps {
  price: { amount: number; currency: string };
  method: { name: string; icon: string };
  service: Service;
}

export default function PaymentButton({
  price,
  method,
  service,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user, promptLogin } = auth;

  const handlePayment = async () => {
    const paymentAction = async () => {
      if (method.name === "Mercado Pago") {
        setIsLoading(true);
        try {
          const response = await fetch("/api/create-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: service.id,
              title: service.leftColumn.title,
              unit_price: price.amount,
              currency_id: price.currency,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create payment preference");
          }

          const data = await response.json();
          window.location.href = data.init_point;
        } catch (error) {
          console.error(error);
          alert("Error al procesar el pago. Por favor, intenta de nuevo.");
          setIsLoading(false);
        }
      } else {
        // Handle other payment methods
        console.log("Proceeding to payment with:", method.name);
      }
    };

    if (!user) {
      promptLogin(paymentAction);
      return;
    }

    paymentAction();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-secondary text-white rounded-lg p-4 flex items-center justify-between hover:bg-secondary-foreground transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      <div className="flex items-center">
        <Image
          src={method.icon}
          alt={method.name}
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-left">Pago en {price.currency}</p>
          <p className="text-sm text-gray-300 text-left">Via: {method.name}</p>
        </div>
      </div>
      <div className="text-right">
        {isLoading ? (
          <p className="text-xl ">Procesando...</p>
        ) : (
          <>
            <p className="text-xl ">
              {price.amount.toLocaleString("es-AR", {
                style: "currency",
                currency: price.currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-sm">Pagar</p>
          </>
        )}
      </div>
    </button>
  );
}
