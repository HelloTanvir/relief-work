import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Header from './Header';
import Loader from './Loader';
import Sidebar from './Sidebar';

const Layout: React.FC = ({ children }) => {
    const router = useRouter();

    const { isLoading, title } = useSelector<RootState, RootState['state']>((store) => store.state);

    const isAuthPage = router.pathname.match(/(\/login|\/register\/)/g);

    // if the rendered page is login or register page, no need to render header and sidebar here
    if (isAuthPage) {
        return children;
    }

    return (
        <div>
            <Head>
                <title>Relief Work | {title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header />

                    <main className="flex gap-2 md:gap-5 bg-gray-50">
                        <Sidebar />

                        <div className="flex-1 overflow-y-auto h-[calc(100vh-57px)]">
                            {children}
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default Layout;
