// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyASujBRyp0xQ9zcgFREa_s2x6_rOpZrHSQ',
  authDomain: 'mohite-task.firebaseapp.com',
  projectId: 'mohite-task',
  storageBucket: 'mohite-task.appspot.com',
  messagingSenderId: '399998093374',
  appId: '1:399998093374:web:1ca0384a4c3d438164296f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;