"use client";

import Image from "next/image";
import { useState } from "react";
import { Currency } from "@/types";
import { currencies } from "@/lib/constants";

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onChange: (currency: Currency) => void;
}

export default function CurrencySelector({
  selectedCurrency,
  onChange,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (currencyCode: Currency) => {
    onChange(currencyCode);
    setIsOpen(false);
  };

  const selectedCurrencyData = currencies.find(
    (c) => c.code === selectedCurrency
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-accent rounded-lg"
      >
        <div className="flex items-center">
          <Image
            src={selectedCurrencyData?.flag || ""}
            alt={selectedCurrencyData?.name || ""}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <span>{selectedCurrencyData?.code}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-accent rounded-lg shadow-lg">
          {currencies
            .filter((c) => c.code !== selectedCurrency)
            .map((currency) => (
              <button
                key={currency.code}
              onClick={() => handleSelect(currency.code as Currency)}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-background"
            >
              <Image
                src={currency.flag}
                alt={currency.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
              <span>{currency.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
