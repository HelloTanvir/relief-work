import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrgs } from '../../apiHandlers/org';
import { setState } from '../../store/stateSlice';

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setState({ title: 'Organizations' }));
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center flex-1 gap-5 py-5 overflow-y-auto">
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

                    <p className="text-sm font-medium text-gray-900">{organization.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Organizations;
