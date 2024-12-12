// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth ,signOut } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2swnPSE3-Sf9LFU1x70821mSPcvl5ovQ",
    authDomain: "flreab.firebaseapp.com",
    databaseURL: "https://flreab-default-rtdb.firebaseio.com",
    projectId: "flreab",
    storageBucket: "flreab.firebasestorage.app",
    messagingSenderId: "231938248871",
    appId: "1:231938248871:web:2a29eda0b6239c88624b82",
    measurementId: "G-R4XE7JHEJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth=getAuth(app);
auth.settings.appVerificationDisabledForTesting= true;
export { db ,storage,auth,signOut,RecaptchaVerifier};
