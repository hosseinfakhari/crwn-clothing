import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDwAb1Ck8YVpZ65cX8Ev0wc9z_1wP3YG4M",
    authDomain: "crwn-db-ebc9d.firebaseapp.com",
    databaseURL: "https://crwn-db-ebc9d.firebaseio.com",
    projectId: "crwn-db-ebc9d",
    storageBucket: "crwn-db-ebc9d.appspot.com",
    messagingSenderId: "733722903113",
    appId: "1:733722903113:web:5b41aa3c907ff6a6463598",
    measurementId: "G-4XXQVVWKLR"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.error('error on creating user', error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;