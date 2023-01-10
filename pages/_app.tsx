import type { AppProps } from 'next/app'
import '../styles/globals.css';
import '../styles/design_tokens.css';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../app/firebaseApp'


export default function App({ Component, pageProps }: AppProps) {
  if (!auth.currentUser) {
    signInAnonymously(auth);
  }
  onAuthStateChanged(auth, (user: any) => {
    console.log(user);
  })
  return (<>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>)
}
