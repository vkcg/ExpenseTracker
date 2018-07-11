import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCbei5BExVfjftyxuoRvqFvqx9Dm2dENsE",
    authDomain: "react-a2173.firebaseapp.com",
    databaseURL: "https://react-a2173.firebaseio.com",
    projectId: "react-a2173",
    storageBucket: "react-a2173.appspot.com",
    messagingSenderId: "170925318805"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
  
const auth = firebase.auth();
  
export {
    auth,
};
export default firebase;