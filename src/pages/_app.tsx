import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
