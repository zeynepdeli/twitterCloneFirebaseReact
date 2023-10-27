// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVDbAzRN8HS_JE5hWJpg5vHO_6h3DebXI",
  authDomain: "twitter-d1666.firebaseapp.com",
  projectId: "twitter-d1666",
  storageBucket: "twitter-d1666.appspot.com",
  messagingSenderId: "804807292265",
  appId: "1:804807292265:web:ec194c23fd8d9a3d89f9f8",
  measurementId: "G-ZGPMKJ7BC9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//yetkilendirme kurulum
export const auth = getAuth(app);
//google sağlayıcı kurulum
export const googleProvider = new GoogleAuthProvider();
//github sağlayıcı kurulum
export const githubProvider = new GithubAuthProvider();
//veritabanı kurulum
export const db = getFirestore(app);
// medaya depolama laanı kurulumu
export const storage = getStorage(app);
