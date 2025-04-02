import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: "segunda-ph.firebaseapp.com",
    projectId: "segunda-ph",
    storageBucket: "segunda-ph.firebasestorage.app",
    messagingSenderId: "856598904366",
    appId: "1:856598904366:web:ad062e096ca98eb15d29bf",
    measurementId: "G-G85R54L4S4",
};

const app = initializeApp(firebaseConfig);
export default app;
