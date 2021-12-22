import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    token: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const token = req.cookies.relief_work_token || '';

    res.status(200).json({ token });
};

export default handler;
