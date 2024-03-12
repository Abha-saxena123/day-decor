
import React from "react";
import { useRouter } from "next/router";
import { DatePicker } from 'antd';
import { MailOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from "@/components/common/components/form/form";
import { FormInput, StyledButton, StyledDiv, StyledFormWrapper, StyledH2, StyledInput, StyledTitle } from "@/components/common/components/form/form.styles";
import styled from "styled-components";
import axios from "axios";
import getConfig from "next/config";

interface SignInProps {
    username: string;
    email: string;
    password: string;
    dateOfBirth: Date
}

const {
    publicRuntimeConfig: { apiUrl },
} = getConfig();

export const SignUpForm: React.FC = () => {
    const router = useRouter();

    const handleFormSubmit = async (data: SignInProps) => {
        const userData = { ...data, datOfBirth: data.dateOfBirth.toISOString() }
        try {
            const resp = await axios.post(`${apiUrl}/api/auth/local/register`, userData);
            router.push('/');
        } catch (err: any) {
            console.log(err)
        }
    };

    return (
        <Form onSubmit={handleFormSubmit} isLogin={true}>
            <StyledTitle>Welcome !</StyledTitle>
            <StyledH2> Sign up to your account</StyledH2>
            <StyledDiv >
                <FormInput name="username" rules={[{ required: true, message: 'Please input your User name!' }]}>
                    <StyledInput placeholder="User Name" prefix={<UserOutlined />} />
                </FormInput>
                <FormInput name="email" rules={[{ required: true, message: 'Please input your Email' }]}>
                    <StyledInput
                        placeholder="Email"
                        prefix={<MailOutlined />}
                        type={"text"}
                    />
                </FormInput>
                <FormInput name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <StyledInput.Password placeholder="Password" prefix={<UnlockOutlined />} />
                </FormInput>
                <StyledFormWrapper name="dateOfBirth" rules={[{ required: true, message: 'Please input your Birth Date!' }]}>
                    <DatePicker />
                </StyledFormWrapper>
                <StyledFormWrapper >
                    <StyledButton type="primary" htmlType="submit">Sign Up</StyledButton>
                </StyledFormWrapper>
                <p>Already have an account? <a href="/login">Login</a></p>
            </StyledDiv>
        </Form >
    );
};

