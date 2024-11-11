import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Importando a função para Firestore

const firebaseConfig = {
    apiKey: "AIzaSyB1q_KtW9x1WoizpJ61Z8ppFjbc6PGBqCg",
    authDomain: "biblioteca-66325.firebaseapp.com",
    projectId: "biblioteca-66325",
    storageBucket: "biblioteca-66325.firebasestorage.app",
    messagingSenderId: "1003294098370",
    appId: "1:1003294098370:web:09849ba9b5ac2713fe4c5b",
    measurementId: "G-BDR2R8PRW5"
  };

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;