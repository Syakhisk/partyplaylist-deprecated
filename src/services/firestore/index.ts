import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX2YZ_NolrWUaagYRaPaEkg1YYS0BngJQ",
  authDomain: "personal-projects-00.firebaseapp.com",
  projectId: "personal-projects-00",
  storageBucket: "personal-projects-00.appspot.com",
  messagingSenderId: "765797876296",
  appId: "1:765797876296:web:7697ec245194b7c3bb4e7d",
  measurementId: "G-PW36N5FCRZ",
};

export const COLLECTION_NAME = "partyplaylist-sessions";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
