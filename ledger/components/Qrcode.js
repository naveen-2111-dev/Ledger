import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Qrcode = ({ text }) => {
  const [qrCodeData, setQrCodeData] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      if (!text) {
        console.error("No input text provided for QR code generation.");
        return;
      }

      try {
        const qrCodeURL = await QRCode.toDataURL(text);
        setQrCodeData(qrCodeURL);
        localStorage.setItem("url", qrCodeURL);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };

    generateQRCode();
  }, [text]);

  return (
    <div>
      {qrCodeData ? (
        <img
          src={qrCodeData}
          alt="QR Code"
          className="border border-gray-600 h-32 w-32 rounded-md"
        />
      ) : (
        <AiOutlineLoading3Quarters
          className="text-4xl text-white animate-spin"
          size={20}
        />
      )}
    </div>
  );
};

export default Qrcode;
