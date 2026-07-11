import type { AppProps } from 'next/app'
import '../styles/globals.css';
import '../styles/design_tokens.css';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Layout from '../components/Layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Align Material UI with the app's design tokens so every MUI control
// (buttons, chips, inputs, radios, spinners) speaks the brand's indigo
// instead of MUI's default blue.
const theme = createTheme({
  palette: {
    primary: { main: '#5651e5', dark: '#4640d8' },
    success: { main: '#16a34a' },
    text: { primary: '#1a1f36', secondary: '#667085' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: `'Raleway', ui-sans-serif, system-ui, -apple-system, sans-serif`,
    button: { textTransform: 'none', fontWeight: 600 },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />

        </Layout>
      </ThemeProvider>
    </Provider>
  </>)
}
