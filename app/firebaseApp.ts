import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, EmailAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/analytics"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCLHjoSpPueDt3_Fy5BcyT9vKWLXuh0sjw",
    authDomain: "rt-poll.firebaseapp.com",
    projectId: "rt-poll",
    storageBucket: "rt-poll.appspot.com",
    messagingSenderId: "146578956832",
    appId: "1:146578956832:web:c7bdf3b5046a0674e39245",
    measurementId: "G-TJ180W7MZG"
});

export const analytics: firebase.analytics.Analytics = (typeof window !== 'undefined' && firebase.analytics(app)) as firebase.analytics.Analytics;
// initializeApp({
//     apiKey: "AIzaSyCLHjoSpPueDt3_Fy5BcyT9vKWLXuh0sjw",
//     authDomain: "rt-poll.firebaseapp.com",
//     projectId: "rt-poll",
//     storageBucket: "rt-poll.appspot.com",
//     messagingSenderId: "146578956832",
//     appId: "1:146578956832:web:c7bdf3b5046a0674e39245",
//     measurementId: "G-TJ180W7MZG"
// });
export const auth = firebase.auth();
