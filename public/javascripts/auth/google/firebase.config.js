// @ts-ignore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// @ts-ignore
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// @ts-ignore
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBZuhG3WLNMD_VIoeUrnhMA8UN5UgGfgDY",
    authDomain: "memory-game-db746.firebaseapp.com",
    projectId: "memory-game-db746",
    storageBucket: "memory-game-db746.appspot.com",
    messagingSenderId: "1055719462094",
    appId: "1:1055719462094:web:bc86fd11371efc41656c9f",
    measurementId: "G-LJX36HPEFX",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
const analytics = getAnalytics(app);
