import type { AppProps } from 'next/app'
import '../styles/globals.css';
import '../styles/design_tokens.css';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Layout from '../components/Layout/Layout';


export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />

      </Layout>
    </Provider>
  </>)
}
