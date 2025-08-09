"use client";

import { useState } from "react";
import { Service } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySelector from "./CurrencySelector";
import PaymentButton from "./PaymentButton";
import Modal from "@/components/Modal";

interface PaymentSectionProps {
  service: Service;
}

export default function PaymentSection({ service }: PaymentSectionProps) {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const selectedPrice = service.prices.find(
    (p) => p.currency === selectedCurrency
  );

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500">costo:</p>
        <div className="flex items-center justify-between">
          <p className="text-[2rem] font-light">
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

      <hr className="border-black" />
       
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

      {service.targetAudience && service.faq && (
        <div className="space-y-3 pt-4">
          <button
            onClick={() => openModal("¿Para quién es este programa?", service.targetAudience || "")}
            className="w-full border-gray-500 text-left p-3 border rounded-lg flex justify-between items-center"
          >
            <span className="text-sm">¿Para quién es este programa?</span>
            <span>+</span>
          </button>
          <button
            onClick={() => openModal("Preguntas Frecuentes", service.faq || "")}
            className="w-full text-left p-3 border border-gray-500 rounded-lg flex justify-between items-center"
          >
            <span className="text-sm">Preguntas Frecuentes</span>
            <span>+</span>
          </button>
          <p className="text-xs text-gray-500 pt-2">
            Antes de iniciar el plan debes abonarlo. Una vez que lo hagas coordinaremos fechas para nuestro encuentro. Los encuentros pactados pueden modificarse con 24 hs de antelacion pasado ese tiempo la consulta se cobra de todas formas.
          </p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
        <p>{modalContent.content}</p>
      </Modal>
    </div>
  );
}
