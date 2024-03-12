import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { setCookie } from 'nookies'


const {
    publicRuntimeConfig: { apiUrl },
} = getConfig();
export default async (req: NextApiRequest,
    res: NextApiResponse) => {
    const { username, password, email, dateOfBirth } = req.body;

    try {
        const response = await axios.post(`${apiUrl}/api/auth/local/register`, {
            username,
            email,
            password,
            dateOfBirth
        })

        setCookie({ res }, 'jwt', response.data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });

        res.status(200).end();
    } catch (e) {
        res.status(400).send(e.response.data.message[0].messages[0]);
    }
}