// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Para autenticación
import { getFirestore } from "firebase/firestore"; // Para base de datos Firestore
import { getStorage } from "firebase/storage"; // Para almacenamiento si lo necesitas

const firebaseConfig = {
    apiKey: "AIzaSyDGYjpaKx53FKamptEuBG_Qp495JvMvDFE",
    authDomain: "proyecto-apis-679f3.firebaseapp.com",
    projectId: "proyecto-apis-679f3",
    storageBucket: "proyecto-apis-679f3.appspot.com",
    messagingSenderId: "479847482355",
    appId: "1:479847482355:web:6d9125bbc31fe035c9c886",
    measurementId: "G-BTTRXT62W7"
};

const app = initializeApp(firebaseConfig);

// Exportar los servicios que quieras usar
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
