// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js";

const firebaseConfig = {
    // TEMPELKAN API KEY DAN CONFIG FIREBASE KAMU DI SINI
    apiKey: "AIzaSyATMm7NhnDgOI3klh2EiV7xkb9GMIoUWHg",
  authDomain: "lyynaleyxiters.firebaseapp.com",
  projectId: "lyynaleyxiters",
  storageBucket: "lyynaleyxiters.firebasestorage.app",
  messagingSenderId: "85048055336",
  appId: "1:85048055336:web:4a8b07e8ef32690e36871d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);