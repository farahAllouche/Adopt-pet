import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXyAm_nmFy8TdE26UIScSK40zxvvwzQ24",
  authDomain: "fir-adopt-pet.firebaseapp.com",
  projectId: "fir-adopt-pet",
  storageBucket: "fir-adopt-pet.appspot.com",
  messagingSenderId: "126333126255",
  appId: "1:126333126255:web:400d32a57b08405655ef9a",
  measurementId: "G-6M6KGBLJM0",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp, "gs://fir-adopt-pet.appspot.com");

export { storage };
