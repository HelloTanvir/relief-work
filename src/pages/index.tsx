import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoggedInUser } from '../apiHandlers/auth';
import { setState } from '../store/stateSlice';

interface Data {
    loggedIn: boolean;
    user: any;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const token = req.cookies.relief_work_token || '';

    const data = await getLoggedInUser(token);

    if (!data.loggedIn) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: data,
    };
};

const Home = ({ loggedIn }: Data) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setState({ title: 'Home' }));
        console.log({ loggedIn });
    }, [loggedIn, dispatch]);

    return <div>this is home page</div>;
};

export default Home;
