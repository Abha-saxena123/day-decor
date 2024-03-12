
import React from "react";
import { useRouter } from "next/router";
import { DatePicker } from 'antd';
import { MailOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from "@/components/common/components/form/form";
import { FormInput, StyledButton, StyledDiv, StyledFormWrapper, StyledH2, StyledInput, StyledTitle } from "@/components/common/components/form/form.styles";
import styled from "styled-components";
import axios from "axios";
import getConfig from "next/config";

interface ForgotPasswordProps {
    email: string;
}

const {
    publicRuntimeConfig: { apiUrl },
} = getConfig();

export const ForgotPasswordForm: React.FC = () => {

    const handleFormSubmit = async (data: ForgotPasswordProps) => {
        try {
            console.log("entered", data)
            const resp = await axios.post(`${apiUrl}/api/auth/forgot-password`, data);
            console.log(resp, "tsresrtere")
            alert("Email sent to provided Email")

        } catch (err: any) {
            console.log(err)
        }
    };

    return (
        <Form onSubmit={handleFormSubmit} isLogin={true}>
            <StyledTitle>Forgot Password?</StyledTitle>
            <StyledH2> No worries 🙌</StyledH2>

            <StyledDiv>
                <FormInput name="email" rules={[{ required: true, message: 'Please input your Email' }]}>
                    <StyledInput
                        placeholder="Email"
                        prefix={<MailOutlined />}
                        type={"text"}
                    />
                    {/* <p>Enter your Email and get reset password link</p> */}
                </FormInput>
                <StyledFormWrapper >
                    <StyledButton type="primary" htmlType="submit">Submit</StyledButton>
                </StyledFormWrapper>
            </StyledDiv>
        </Form >
    );
};

