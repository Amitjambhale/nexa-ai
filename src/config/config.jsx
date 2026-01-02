import CryptoJS from "crypto-js";
import toast from "react-hot-toast";
// const config = {
//   mode: CryptoJS.mode.CBC,
//   padding: CryptoJS.pad.Pkcs7,
// };

// export const encryptData = (value) => {

//   const data = CryptoJS.AES.encrypt(
//     JSON.stringify(value),
//     process.env.REACT_APP_CRYPTO_SECRET_KEY
//   ).toString();

//   return data;
// };

const secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY; // .env se key le
const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16-char IV (fix ya random)

// Encrypt function
export const encryptPassword = (value) => {
  const encrypted = CryptoJS.AES.encrypt(
    value, // yaha string pass hoga
    CryptoJS.enc.Utf8.parse(secretKey), // key parse
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

// export const decryptData = (response) => {
//   if (response.name === "AxiosError") {
//     return response;
//   } else {
//     const { data } = response;
//     if (data) {
//       const bytes = CryptoJS.AES.decrypt(
//         data,
//         process.env.REACT_APP_CRYPTO_SECRET_KEY
//       );
//       const finalValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

//       return finalValue;
//     } else {
//       return response;
//     }
//   }
// };

export const encryptReqData = (data) => {
  try {
    const key = process.env.REACT_APP_CRYPTO_SECRET_KEY;

    // Direct data ko stringify karke encrypt karein
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();

    // Direct encrypted string bhejें, extra { reqData: { ... } } ke bina
    return {
      reqData: encrypted,
    };
  } catch (err) {
    console.error("Encryption error:", err);
    return { reqData: data };
  }
};

export const decryptData = (response) => {
  if (response.name === "AxiosError") {
    return response;
  }

  try {
    const { data } = response;
    if (!data) return response;

    const key = process.env.REACT_APP_CRYPTO_SECRET_KEY;

    const bytes = CryptoJS.AES.decrypt(data, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return data;
    }

    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Decryption error:", err);
    return response.data || response;
  }
};

export const normalEncryptData = (value, type) => {
  const data = CryptoJS.AES.encrypt(
    String(value),
    process.env.REACT_APP_CRYPTO_SECRET_KEY
  ).toString();

  return type === "route" ? data.split("/").join("~") : data;
};

export const normalDecryptDataOld = (data, type) => {
  if (data) {
    const bytes = CryptoJS.AES.decrypt(
      type === "route" ? data.split("~").join("/") : data,
      process.env.REACT_APP_CRYPTO_SECRET_KEY
    );
    const finalValue = bytes.toString(CryptoJS.enc.Utf8);
    return finalValue;
  } else {
    return data;
  }
};

export const normalDecryptData = (data, type) => {
  if (data) {
    try {
      console.log("Received data for decryption:", data);

      const key = process.env.REACT_APP_CRYPTO_SECRET_KEY;

      const bytes = CryptoJS.AES.decrypt(
        type === "route" ? data.split("~").join("/") : data,
        key
      );

      const finalValue = bytes.toString(CryptoJS.enc.Utf8);
      return finalValue;
    } catch (error) {
      //console.error('Error during decryption:', error);
      return null;
    }
  } else {
    return data;
  }
};

export function disableReactDevTools() {
  // Check if the React Developer Tools global hook exists
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "object") {
    return;
  }

  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    if (prop === "renderers") {
      // initialize this with an empty `Map`,
      // else it will throw an error in console

      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
    } else {
      // Replace all of its properties with a no-op function or a null value
      // depending on their types

      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] =
        typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === "function"
          ? () => {}
          : null;
    }
  }
}

// __________________________  Helper Responses  _______________________________//
export const failResponse = (res) => {
  if (res.message != "Network Error") {
    toast.error(res.message, { id: "fail" });
  }
};

export const errorResponse = (err) => {
  if (err?.response?.data?.message || err.message != "Network Error") {
    toast.error(err?.response?.data?.message || err.message);
  }
};

export const customMessage = (message) => {
  if (message != "Network Error") {
    toast.error(message);
  }
};
