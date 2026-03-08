
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCbvni8TwFS3E65peM3-JbNlEokqsXIMhaE",
    authDomain: "hyperplott-1fd80.firebaseapp.com",
    projectId: "hyperplott-1fd80",
    storageBucket: "hyperplott-1fd80.firebasestorage.app",
    messagingSenderId: "964829684773",
    appId: "1:964829684773:web:3f2b9ea8363d49baf0cbcc",
    measurementId: "G-1J5FV6L96K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = 'demo_researcher@hyperplott.ai';
const password = 'Password123!';

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log('Successfully created account:', userCredential.user.email);
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error:', error.code, error.message);
        process.exit(1);
    });
