"use client";

import { useEffect, useState } from "react";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

import { PullDataProvider } from "@/contexts/productcontext";
import ProductsContent from "./productscontent";

export default function PaymentPage() {
  const [qr, setQr] = useState<string>("");

  const phoneNumber = "0886416734";
  const amount = 100;

  useEffect(() => {
    const payload = generatePayload(phoneNumber, { amount });

    QRCode.toDataURL(payload)
      .then((url) => setQr(url))
      .catch((err) => console.error(err));
  }, []);

  return (
    <PullDataProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black gap-10 px-6">
        
        {/* LEFT: PromptPay QR */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">PromptPay QR</h2>

          {qr ? (
            <img src={qr} alt="PromptPay QR Code" className="w-64 h-64" />
          ) : (
            <p>Generating QR...</p>
          )}

          <p className="mt-4 text-gray-600">Amount: ฿{amount}</p>
        </div>

        {/* RIGHT: Ordered products */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-96 max-h-[500px] overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Ordered</h3>
          <ProductsContent />
        </div>

      </div>
    </PullDataProvider>
  );
}
