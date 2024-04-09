

import { Form } from "../common/components/form/form";
import { FormInput, StyledInput, StyledFormWrapper, StyledTitle, IconWrapper, StyledButton, StyledDiv, StyledH2 } from "../common/components/form/form.styles";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Button, Divider, Anchor } from 'antd'
import { encryptData } from "../common/utils/helpers/encryption.helpers";
import { MailOutlined, UnlockOutlined, GooglePlusSquareFilled, FacebookFilled, LinkedinFilled } from '@ant-design/icons';
import getConfig from "next/config";
import styled from "styled-components";
import axios from "axios";


const {
    publicRuntimeConfig: { apiUrl },
} = getConfig();


interface LoginProps {
    email: string;
    password: string;
}



export const LoginForm: React.FC = () => {
    const router = useRouter();

    const [emailError, setEmailError] = useState<string>("");
    const [showLoader, setLoader] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | string[] | null>(null);


    // useEffect(() => {
    //     // console.log(router)
    //     if (router?.query?.error) {
    //         // setLoginError(SIGNIN_ERRORS[router.query.error as keyof SignInErrors] ?? router.query.error);
    //     }
    // }, [router]);
    const signInFB = () => { signIn(); }
    const handleForgotPassword = async () => {
        console.log("-------------");
        // /api/auth / forgot - password
        try {
            const resp = await axios.post(`${apiUrl}/api/auth/forgot-password`);
            router.push('/');
        } catch (err: any) {
            console.log(err)
        }
    }
    const handleFormSubmit = async (data: LoginProps) => {
        const { email, password } = data;
        console.log(data, "==========")
        setLoginError(null);
        // setLoader(true);
        const encryptedPassword = await encryptData(password);
        console.log(encryptedPassword)

        const res = await signIn("credentials", {
            redirect: true,
            email: email,
            password: password,
        });

        if (res?.error) {
            console.log(res.error)
            setLoginError(res?.error);
        }

        setLoader(false);

        if (res?.ok) {
            if (res.url) {
                router.replace(res.url);
            }
        }
    };

    return (
        <Form onSubmit={handleFormSubmit} isLogin={true}>
            <StyledTitle>Welcome Back !</StyledTitle>
            <StyledH2> Log in to your account</StyledH2>


            <StyledDiv className="glow">
                <IconWrapper>
                    <GooglePlusSquareFilled style={{ fontSize: "42px" }} onClick={() => signIn("google")} />

                    <FacebookFilled style={{ fontSize: "42px" }} onClick={() => signIn("facebook")} />

                    <LinkedinFilled style={{ fontSize: "42px" }} />
                </IconWrapper>
                <Divider>or use your email</Divider>

                <FormInput name="email" rules={[{ required: true, message: 'Please input your Email' }]}>
                    <StyledInput
                        placeholder="Email"
                        prefix={<MailOutlined />}
                        type={"text"}
                    />
                </FormInput>
                <FormInput name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <div>
                        <StyledInput.Password placeholder="Password" prefix={<UnlockOutlined />} />
                        <ForgotPasswordButton>
                            <a href="/forgot-password">Forgot Password?</a>
                        </ForgotPasswordButton>
                    </div>
                </FormInput>
                <StyledFormWrapper >
                    <StyledButton type="primary" htmlType="submit">Login</StyledButton>
                </StyledFormWrapper>
                <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
            </StyledDiv>
        </Form>
    );
};



const ForgotPasswordButton = styled.div`
width:100%;
justify-content:end;
display:flex;
>button{
padding:0;
margin:0;
}
`