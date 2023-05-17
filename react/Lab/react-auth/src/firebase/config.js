import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDX0Arg0-Gn_Sp_Fy4OljYaSCCVTQ5hgNM",
  authDomain: "react-funix.firebaseapp.com",
  databaseURL:
    "https://react-funix-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-funix",
  storageBucket: "react-funix.appspot.com",
  messagingSenderId: "363193335895",
  appId: "1:363193335895:web:b5605f19aaf49770e3a312",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
