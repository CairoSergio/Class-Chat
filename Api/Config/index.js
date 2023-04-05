import  firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBhnfdNTKZw3JIPM9FxrrJ3Z7ZTf6toAsY",
    authDomain: "classchat-464e0.firebaseapp.com",
    projectId: "classchat-464e0",
    storageBucket: "classchat-464e0.appspot.com",
    messagingSenderId: "941466880386",
    appId: "1:941466880386:web:6fc420a4a298cfc321a79b"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase;