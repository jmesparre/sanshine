'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { BANK_DETAILS } from '@/lib/constants';

// Simple copy icon component
const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
  amount: number;
  currency: string;
}

const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceName,
  amount,
  currency,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-6 max-w-2xl m-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 pt-5 text-center">
          Datos para Transferencia
        </h2>
        <p className="mb-4 text-center text-sm sm:text-base">
          Para completar tu compra de <strong>{serviceName}</strong> por{' '}
          <strong>
            {amount} {currency}
          </strong>
          , realiza una transferencia a:
        </p>
        <div className="mb-6 text-xs sm:text-sm rounded-lg bg-gray-50 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Banco:</span>
            <span>{BANK_DETAILS.bank}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Titular:</span>
            <span>{BANK_DETAILS.holder}</span>
          </div>
          <div className="flex justify-between items-start sm:items-center">
            <span className="font-semibold shrink-0">CLABE/CBU:</span>
            <div className="flex items-center space-x-2">
              <span className="break-all text-right">{BANK_DETAILS.clabe}</span>
              <button
                onClick={() => copyToClipboard(BANK_DETAILS.clabe)}
                className="text-gray-500 hover:text-gray-800"
                title="Copiar CLABE"
              >
                <CopyIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {copied && (
          <p className="text-center text-green-600 text-sm mb-4">
            ¡CLABE copiada al portapapeles!
          </p>
        )}
        <p className="mb-6 text-xs sm:text-sm text-center text-gray-600">
          Una vez realizada la transferencia, haz clic en el botón para notificarnos. Tu orden quedará pendiente hasta que verifiquemos el pago.
        </p>
        <Button
          onClick={onConfirm}
          className="w-full bg-secondary text-white hover:bg-secondary-foreground"
        >
          He realizado la transferencia
        </Button>
      </div>
    </Modal>
  );
};

export default TransferModal;
