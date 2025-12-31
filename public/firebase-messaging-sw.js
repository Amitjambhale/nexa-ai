// Scripts for firebase and firebase messaging
if ("undefined" === typeof window) {
  importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js"
  );

  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseConfig = {
    apiKey: "AIzaSyD32jpPTlRLAk6xUzEbX8M9GqKYYzp7AYk",
    authDomain: "shubhramobileapp.firebaseapp.com",
    projectId: "shubhramobileapp",
    storageBucket: "shubhramobileapp.appspot.com",
    messagingSenderId: "994237575733",
    appId: "1:994237575733:web:b975609126a875d2faf77c",
    measurementId: "G-5NJEZJ5HZY",
  };

  firebase.initializeApp(firebaseConfig);

  // Retrieve firebase messaging
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
