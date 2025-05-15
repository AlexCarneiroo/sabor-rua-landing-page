
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Adicionar import do Storage

const firebaseConfig = {
  apiKey: "AIzaSyA2k0WSfKmk2Ta2OrQTQ9yU1vPts5QywXc", // Mantido conforme fornecido pelo usuário
  authDomain: "leandpages.firebaseapp.com",
  projectId: "leandpages",
  storageBucket: "leandpages.appspot.com", // Usar o formato .appspot.com para o SDK
  messagingSenderId: "125625473745",
  appId: "1:125625473745:web:1703fcdb578ce4938203f0",
  measurementId: "G-4TD5QFLKSX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Exportar a instância do Storage

export default app;
