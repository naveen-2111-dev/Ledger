import "tailwindcss/tailwind.css";
import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { FaCheckCircle, FaSyncAlt, FaTimes } from "react-icons/fa";
import UserCheckout from "@/helper/checkres";

export default function QrcodePage() {
  const [scanResult, setScanResult] = useState(null);
  const readerRef = useRef(null);
  const [pop, setPop] = useState(true);
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);

  const onClose = () => {
    setPop(false);
  };

  useEffect(() => {
    if (scanResult) {
      try {
        const parser = JSON.parse(scanResult);
        setEmail(parser.teamLeaderEmail);
        setActive(false);
      } catch (error) {
        console.error("Failed to parse QR code data:", error);
      }
    }
  }, [scanResult]);

  useEffect(() => {
    const fetchData = async () => {
      if (scanResult && email) {
        try {
          const res = await UserCheckout(email);

          if (res.ok) {
            console.log("User removed successfully");
          } else {
            const errorData = await res.json();
            console.error("Error:", errorData.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();
  }, [scanResult, email]);

  useEffect(() => {
    let scanner;

    if (pop && readerRef.current && active) {
      scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(
        (result) => {
          scanner.clear();
          setScanResult(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch((error) => console.log("Failed to clear scanner:", error));
      }
    };
  }, [pop, active]);

  const handleScanAgain = () => {
    setScanResult(null);
    setEmail("");
    setActive(true);
  };

  return (
    <>
      {pop ? (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-gray-300 p-6 rounded-lg shadow-2xl w-full max-w-md relative">
            <div className="flex justify-between items-center mb-6 bg-gray-600 p-3 rounded-lg">
              <h1 className="text-lg font-extrabold text-white">
                CheckOut participants
              </h1>
              <button
                onClick={onClose}
                className="text-xl text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>
            </div>
            <div
              id="reader"
              ref={readerRef}
              className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-white flex flex-col items-center justify-center"
            ></div>
            {scanResult && (
              <div className="mt-4 text-xl text-green-800 font-black p-2 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center gap-3">
                  Scan Result: <FaCheckCircle size={20} />
                </div>
                {email}
              </div>
            )}
            {scanResult && (
              <div className="flex justify-center items-center">
                <button
                  onClick={handleScanAgain}
                  className="mt-4 p-2 text-black rounded-md flex items-center"
                >
                  <FaSyncAlt className="ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
