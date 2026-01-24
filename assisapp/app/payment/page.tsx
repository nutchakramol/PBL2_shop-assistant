'use client';

import React, { useEffect, useState } from 'react';
import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';

const PromptPayQR = () => {
  const [qr, setQr] = useState<string>('');

  const phoneNumber = '0886416734';
  const amount = 100;

  useEffect(() => {
    const payload = generatePayload(phoneNumber, { amount });

    QRCode.toDataURL(payload)
      .then((url) => {
        setQr(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">PromptPay QR</h2>

      {qr ? (
        <img src={qr} alt="PromptPay QR Code" className="w-64 h-64" />
      ) : (
        <p>Generating QR...</p>
      )}

      <p className="mt-4 text-gray-600">Amount: ฿{amount}</p>
    </div>
  );
};

export default PromptPayQR;
