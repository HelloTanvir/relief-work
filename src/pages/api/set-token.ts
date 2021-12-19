import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    success: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token }: { token: string } = req.body;

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('relief_work_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 86400, // one day
            sameSite: 'strict',
            path: '/',
        })
    );

    res.status(200).json({ success: true });
};

export default handler;
