
import React from "react";
import { useRouter } from "next/router";
import { DatePicker } from 'antd';
import { MailOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from "@/components/common/components/form/form";
import { FormInput, StyledButton, StyledDiv, StyledFormWrapper, StyledH2, StyledInput } from "@/components/common/components/form/form.styles";
import styled from "styled-components";
import { SignUpForm } from "@/components/auth/signup-form";
import { NextPage } from "next";
import { AuthFormLayout } from "@/components/common/components/layout/auth-form-layout";

type NextPageWithAuthLayout = NextPage & {
    auth?: boolean;
    getLayout?: any
};
const SignUp: NextPageWithAuthLayout = () => {
    return (
        <SignUpForm />
    );
};

export default SignUp;

SignUp.auth = false;

SignUp.getLayout = function getLayout(page: any) {
    return (
        <AuthFormLayout>{page}
        </AuthFormLayout>
    )
}

