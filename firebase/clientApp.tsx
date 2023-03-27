import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCFhsWOzsE8dG948mw-5yTSoiHAy6aMo0",
  authDomain: "testapp-36d58.firebaseapp.com",
  projectId: "testapp-36d58",
  storageBucket: "testapp-36d58.appspot.com",
  messagingSenderId: "961828447855",
  appId: "1:961828447855:web:befcd98f126dec1a4f8f9a"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;