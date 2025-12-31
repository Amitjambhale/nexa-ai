import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD32jpPTlRLAk6xUzEbX8M9GqKYYzp7AYk",
  authDomain: "shubhramobileapp.firebaseapp.com",
  projectId: "shubhramobileapp",
  storageBucket: "shubhramobileapp.appspot.com",
  messagingSenderId: "994237575733",
  appId: "1:994237575733:web:b975609126a875d2faf77c",
  measurementId: "G-5NJEZJ5HZY",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = () => {
  process.env.GRPC_VERBOSITY = "DEBUG";
  process.env.GRPC_TRACE = "all";
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
