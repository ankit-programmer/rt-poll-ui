import React from 'react'
import Auth from '../components/Auth/Auth'
import { auth as firebaseAuth } from '../app/firebaseApp'
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { GiTurret } from 'react-icons/gi';

export default function Login() {
    firebaseAuth.onAuthStateChanged((user: any) => {
        console.log(user?.accessToken);
    })
    return (
        <Auth uiConfig={{
            autoUpgradeAnonymousUsers: true,
            callbacks: {
                signInSuccessWithAuthResult(authResult, redirectUrl?) {
                    return true;
                },
                signInFailure(error) {
                    if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                        return Promise.resolve();
                    }
                    // Handle account merge conflict
                    // The credential the user tried to sign in with.
                    var cred = error.credential;

                    /**
                     * TODO: ANKIT : PENDING
                     * 
                     * USER MERGE PROCESS
                     * -> Save authToken in global variable fron Anynomous user
                     * -> Proceed to login with new credentials
                     * -> Get authToken of new User
                     * -> Make an API call and send both token
                     * -> Backend will verify both token
                     * -> And create a account merge task if tokens are legit
                     * 
                     */



                    // If using Firebase Realtime Database. The anonymous user data has to be
                    // copied to the non-anonymous user.
                    // var app = firebase.app();
                    // // Save anonymous user data first.
                    // return app.database().ref('users/' + firebase.auth().currentUser.uid)
                    //     .once('value')
                    //     .then(function (snapshot) {
                    //         data = snapshot.val();
                    //         // This will trigger onAuthStateChanged listener which
                    //         // could trigger a redirect to another page.
                    //         // Ensure the upgrade flow is not interrupted by that callback
                    //         // and that this is given enough time to complete before
                    //         // redirection.
                    //         return firebase.auth().signInWithCredential(cred);
                    //     })
                    //     .then(function (user) {
                    //         // Original Anonymous Auth instance now has the new user.
                    //         return app.database().ref('users/' + user.uid).set(data);
                    //     })
                    //     .then(function () {
                    //         // Delete anonymnous user.
                    //         return anonymousUser.delete();
                    //     }).then(function () {
                    //         // Clear data in case a new user signs in, and the state change
                    //         // triggers.
                    //         data = null;
                    //         // FirebaseUI will reset and the UI cleared when this promise
                    //         // resolves.
                    //         // signInSuccessWithAuthResult will not run. Successful sign-in
                    //         // logic has to be run explicitly.
                    //         window.location.assign('<url-to-redirect-to-on-success>');
                    //     });

                },
            },
            signInFlow: 'popup',
            signInSuccessUrl: '/',
            tosUrl: '/terms-of-service',
            privacyPolicyUrl: '/privacy-policy',
            signInOptions: [
                EmailAuthProvider.PROVIDER_ID,
                GoogleAuthProvider.PROVIDER_ID
            ]
        }} firebaseAuth={firebaseAuth}></Auth>
    )
}
