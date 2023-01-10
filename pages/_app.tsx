import type { AppProps } from 'next/app'
import '../styles/globals.css';
import '../styles/design_tokens.css';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../app/firebaseApp'
import { useEffect } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Persist User");
        console.log(user?.uid);
        console.log(user?.isAnonymous);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.log(error);
        })
      }
    })
  }, [])
  return (<>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>)
}
