// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPYGOiSYCFfowze-Hn-y0rLv-yZrZETVI",
    authDomain: "todo-project-492b0.firebaseapp.com",
    projectId: "todo-project-492b0",
    storageBucket: "todo-project-492b0.appspot.com",
    messagingSenderId: "177744153916",
    appId: "1:177744153916:web:ab61d8571453a68a846239"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);