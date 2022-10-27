import { initializeApp } from "firebase/app"
import { FIREBASE_API_KEY } from "react-native-dotenv"

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "poker-game-17764.firebaseapp.com",
    projectId: "poker-game-17764",
    storageBucket: "poker-game-17764.appspot.com",
    messagingSenderId: "346689803663",
    appId: "1:346689803663:web:5df167d9354d2c744d67fa",
}

const app = initializeApp(firebaseConfig)

export default app
