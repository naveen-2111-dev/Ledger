import CryptoJS from "crypto-js";

const secretkey = process.env.NEXT_PUBLIC_SECRET_KEY;

export function Encrypt(message) {
  if (!secretkey) {
    throw new Error("Secret key is not defined.");
  }

  try {
    const cipher = CryptoJS.AES.encrypt(message, secretkey).toString();
    return cipher;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw error; 
  }
}

export function Decode(cipherText) {
  if (!secretkey) {
    throw new Error("Secret key is not defined.");
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(cipherText, secretkey);
    const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);

    if (!originalMessage) {
      throw new Error(
        "Decryption failed. Invalid cipher text or wrong secret key."
      );
    }

    return originalMessage;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error; 
  }
}
