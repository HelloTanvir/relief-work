import axios from 'axios';
import type { LoginData } from '../pages/login';
import { RootState } from '../store/store';

export const logInUser = async (data: LoginData) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/signin`, data);
        const { token }: { token: string } = res.data;

        if (token) {
            await axios.post('/api/set-token', { token });
        }

        return { loggedIn: !!token };
    } catch (err) {
        return { loggedIn: false };
    }
};

export const registerUser = async (data: RootState) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register`, data);
        const { token }: { token: string } = res.data;

        if (token) {
            await axios.post('/api/set-token', { token });
        }

        return { loggedIn: !!token };
    } catch (err) {
        return { loggedIn: false };
    }
};

export const getLoggedInUser = async (token: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return { loggedIn: !!res.data.profile, user: res.data.profile };
    } catch (err) {
        return { loggedIn: false, user: null };
    }
};

export const logOutUser = async () => {
    await axios.post('/api/remove-token');

    return { loggedIn: false };
};
