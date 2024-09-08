import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyChids62lSIlNt-IpuDYgQ5_sNPiooUrj4",
    authDomain: "requester-5c7a3.firebaseapp.com",
    databaseURL:
        "https://productsproject-a75e3-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "requester-5c7a3",
    storageBucket: "requester-5c7a3.appspot.com",
    messagingSenderId: "205470009434",
    appId: "1:205470009434:web:da54eed7e090ae16897063",
    databaseURL:
        "https://productsproject-a75e3-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
