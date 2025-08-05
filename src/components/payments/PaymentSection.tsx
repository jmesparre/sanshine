"use client";

import { Service } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySelector from "./CurrencySelector";
import PaymentButton from "./PaymentButton";

interface PaymentSectionProps {
  service: Service;
}

export default function PaymentSection({ service }: PaymentSectionProps) {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const selectedPrice = service.prices.find(
    (p) => p.currency === selectedCurrency
  );

  return (
    <div className="pl-25 space-y-4">
      <div>
        <p className="text-sm text-gray-500">costo:</p>
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold">
            {selectedPrice?.amount.toLocaleString("es-AR", {
              style: "currency",
              currency: selectedPrice?.currency,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onChange={setSelectedCurrency}
          />
        </div>
      </div>

      <hr />

      <div>
        <p className="text-sm text-gray-500 mb-2">forma de pago:</p>
        {selectedPrice?.paymentMethods.map((method) => (
          <PaymentButton
            key={method.name}
            price={selectedPrice}
            method={method}
            service={service}
          />
        ))}
      </div>
    </div>
  );
}
