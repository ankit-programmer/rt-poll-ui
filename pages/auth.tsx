import React from 'react'
import Auth from '../components/Auth/Auth'
import { auth as firebaseAuth } from '../app/firebaseApp'
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
    firebaseAuth.onAuthStateChanged((user: any) => {
        console.log(user?.accessToken);
    })
    return (
        <Auth uiConfig={{
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
