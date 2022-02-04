import type { AppProps } from 'next/app';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import store from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };

        const end = () => {
            setLoading(false);
        };

        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);

        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);

    return (
        <Provider store={store}>
            <ToastContainer />
            {loading ? (
                <Loader />
            ) : (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )}
        </Provider>
    );
}

export default MyApp;
