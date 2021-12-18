import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('relief_work_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
        })
    );

    res.status(200).json({ success: true });
};

export default handler;
