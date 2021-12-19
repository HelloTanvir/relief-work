import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getOrgs } from '../../apiHandlers/org';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Sidebar from '../../components/Sidebar';

interface Data {
    _id: string;
    isVerified: boolean;
    name: string;
    website: string;
    address: string;
    description: string;
    country: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { success, organizations } = await getOrgs();

    if (!success) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { organizations },
    };
};

const Organizations = ({ organizations }: { organizations: Data[] }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div className="relative">
            <Head>
                <title>Relief Work | Organizations</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* loader */}
            {isLoading ? <Loader /> : null}

            <Header />

            <main style={{ height: 'calc(100vh - 57px)' }} className="flex gap-5 pr-5 bg-gray-50">
                <Sidebar />

                {/* cards wrapper */}
                <div className="flex flex-col items-center flex-1 gap-5 mt-5 mb-5 overflow-y-auto">
                    {organizations.map((organization) => (
                        <div
                            // eslint-disable-next-line no-underscore-dangle
                            key={organization._id}
                            className="flex flex-col max-w-xl gap-3 px-5 py-6 bg-white shadow-md md:gap-1 md:w-screen rounded-xl"
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-lg font-medium tracking-wide">
                                    {organization.name}
                                </span>
                                <span className="text-sm tracking-wide text-gray-500">
                                    ({organization.isVerified ? 'verified' : 'not verified'})
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-gray-700">Website :</span>
                                <a
                                    href={organization.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm italic tracking-wide text-blue-700"
                                >
                                    {organization.website}
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-gray-700">Country :</span>
                                <span className="text-sm tracking-wide text-gray-500">
                                    {organization.country}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-gray-700">Address :</span>
                                <span className="text-sm tracking-wide text-gray-500">
                                    {organization.address}
                                </span>
                            </div>

                            <p className="text-sm font-medium text-gray-900">
                                {organization.description}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Organizations;
