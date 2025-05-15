
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Descomente se precisar do Analytics
// import { getFirestore } from "firebase/firestore"; // Descomente quando for usar o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyA2k0WSfKmk2Ta2OrQTQ9yU1vPts5QywXc",
  authDomain: "leandpages.firebaseapp.com",
  projectId: "leandpages",
  storageBucket: "leandpages.appspot.com", // Corrigido para o formato padrão, se o seu for diferente, ajuste. O anterior era .firebasestorage.app
  messagingSenderId: "125625473745",
  appId: "1:125625473745:web:1703fcdb578ce4938203f0",
  measurementId: "G-4TD5QFLKSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Descomente se precisar do Analytics
// export const db = getFirestore(app); // Descomente e use quando for usar o Firestore

export default app;
