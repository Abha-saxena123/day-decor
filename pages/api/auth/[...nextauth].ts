import { decryptData } from "@/components/common/utils/helpers/decryption.helpers";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
// import Providers from "next-auth/providers";
// import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import getConfig from "next/config";

const {
    publicRuntimeConfig: { apiUrl, rsaPrivateKey },
} = getConfig();


async function signIn({ email, password }: { email: string; password: string }) {
    const res = await axios.post(`${apiUrl}/api/auth/local`, {
        identifier: email,
        password,
    });
    return res.data;
}

const options = {
    providers: [
        GoogleProvider({
            id: "google",
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({
            id: "email",
            name: 'Sign in with Email',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                /**
                 * This function is used to define if the user is authenticated or not.
                 * If authenticated, the function should return an object contains the user data.
                 * If not, the function should return `null`.
                 */
                if (credentials == null) return null;
                /**
                 * credentials is defined in the config above.
                 * We can expect it contains two properties: `email` and `password`
                 */

                try {
                    // const decryptedPassword = decryptData(credentials.password, rsaPrivateKey)
                    // console.log("decryptedPassword", decryptedPassword)
                    const { user, jwt } = await signIn({
                        email: credentials.email,
                        password: credentials.password,
                    });
                    return { ...user, name: user.username, jwt };
                } catch (error) {
                    // Sign In Fail
                    return null;
                }
            },
        }),
    ],
    // database: process.env.NEXT_PUBLIC_DATABASE_URL,
    session: {
        jwt: true,
    },

    callbacks: {
        async redirect() {
            return '/'
        },
        session: async (session: {
            token: {
                name: string;
                email: string;
                picture?: undefined;
                sub?: string;
                id: number;
                jwt: string;
            }; user: any
        }) => {
            console.log("----------", session)
            if (session?.user) {
                session.user.jwt = session.token?.jwt;
                session.user.id = session.token?.id;
            }
            return Promise.resolve(session);
        },
        jwt: async ({ token, user, account }: any) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                const response = await fetch(
                    `${process.env.API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
                );
                const data = await response.json();
                token.jwt = data.jwt;
                token.id = data.user?.id;
            }
            return Promise.resolve(token);
        },
    },
} as unknown as AuthOptions;

export const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);

export default Auth;
