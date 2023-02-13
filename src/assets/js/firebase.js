// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE9PRSrnCemENw8IVBV72otsEUV7QQ7jU",
  authDomain: "themovies-9bdf8.firebaseapp.com",
  projectId: "themovies-9bdf8",
  storageBucket: "themovies-9bdf8.appspot.com",
  messagingSenderId: "558665969859",
  appId: "1:558665969859:web:0d5e8f2382321bd2ddb276",
  measurementId: "G-XZ5MXSBCH4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
