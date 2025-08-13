"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Service } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CurrencySelector from "./CurrencySelector";
import PaymentButton from "./PaymentButton";
import PaypalPagoButton from "./PaypalPagoButton";
import TransferButton from "./TransferButton";
import TransferModal from "./TransferModal";
import Modal from "@/components/Modal";
import { modalContent } from "@/lib/modal-content";

interface PaymentSectionProps {
  service: Service;
}

export default function PaymentSection({ service }: PaymentSectionProps) {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const { user, promptLogin } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [displayModalContent, setDisplayModalContent] = useState({ title: "", content: "" });

  const selectedPrice = service.leftColumn.prices[selectedCurrency.code];
  const serviceModalContent = modalContent[service.id as keyof typeof modalContent];

  const openModal = (title: string, content: string) => {
    setDisplayModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransferClick = () => {
    if (!user) {
      promptLogin();
    } else {
      setIsTransferModalOpen(true);
    }
  };

  const handleConfirmTransfer = async () => {
    if (!user || !selectedPrice) return;

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userName: user.displayName || 'No Name',
        userEmail: user.email || 'No Email',
        serviceId: service.id,
        serviceName: service.leftColumn.title,
        amount: selectedPrice,
        currency: selectedCurrency.code,
        status: "pending",
        paymentMethod: "transfer",
        createdAt: serverTimestamp(),
      });
      setIsTransferModalOpen(false);
      router.push("/pago-pendiente");
    } catch (error) {
      console.error("Error creating order: ", error);
      // Optionally, show an error message to the user
    }
  };

  const getLocale = (currencyCode: string) => {
    switch (currencyCode) {
      case 'ARS':
        return 'es-AR';
      case 'MXN':
        return 'es-MX';
      case 'USD':
        return 'en-US';
      case 'EUR':
        return 'es-ES';
      default:
        return 'es-AR';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500">costo:</p>
        <div className="flex items-center justify-between">
          <p className="text-[2rem] font-light">
            {selectedPrice !== undefined ? selectedPrice.toLocaleString(getLocale(selectedCurrency.code), {
              style: "currency",
              currency: selectedCurrency.code,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }) : 'N/A'}
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
        {selectedPrice !== undefined && (() => {
          switch (selectedCurrency.code) {
            case 'USD':
            case 'EUR':
              return (
                <PaypalPagoButton
                  amount={selectedPrice.toString() || '0'}
                  currency={selectedCurrency.code}
                  serviceName={service.leftColumn.title}
                />
              );
            case 'MXN': 
              return (
                <TransferButton
                  onClick={handleTransferClick}
                  price={{amount: selectedPrice, currency: 'MXN'}}
                  method={{name: 'Transferencia Bancaria', icon: '/mex-flag.png'}}
                />
              );
            case 'ARS':
              return (
                <PaymentButton
                  price={{amount: selectedPrice, currency: 'ARS'}}
                  method={{name: 'Mercado Pago', icon: '/arg-flag.png'}}
                  service={service}
                />
              );
            default:
              return null;
          }
        })()}
      </div>

      {serviceModalContent && (
        <div className="space-y-3 pt-4">
          <button
            onClick={() => openModal("¿Para quién es este programa?", serviceModalContent.targetAudience)}
            className="w-full border-gray-500 text-left p-3 border rounded-lg flex justify-between items-center"
          >
            <span className="text-sm">¿Para quién es este programa?</span>
            <span>+</span>
          </button>
          <button
            onClick={() => openModal("Preguntas Frecuentes", serviceModalContent.faq)}
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
        <h2 className="text-2xl font-bold mb-4">{displayModalContent.title}</h2>
        <p>{displayModalContent.content}</p>
      </Modal>

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onConfirm={handleConfirmTransfer}
        serviceName={service.leftColumn.title}
        amount={selectedPrice || 0}
        currency={selectedCurrency.code || ""}
      />
    </div>
  );
}
