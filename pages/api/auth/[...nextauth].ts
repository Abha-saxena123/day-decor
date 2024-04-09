import { decryptData } from "@/components/common/utils/helpers/decryption.helpers";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
// import Providers from "next-auth/providers";
import FacebookProvider from 'next-auth/providers/facebook';
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
    session: {
        jwt: true,
    },

    callbacks: {
        async redirect() {
            return '/'
        },
        session: async (session: {
            name: string;
            email: string;
            picture?: undefined;
            sub?: string;
            id: number;
            jwt: string;
        }) => {
            return Promise.resolve(session);
        },
        jwt: async ({ token, user }: any) => {
            console.log("S",)
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.id = user.id;
                token.jwt = user.jwt;

            }
            return Promise.resolve(token);
        },
    },
} as unknown as AuthOptions;

export const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);

export default Auth;
