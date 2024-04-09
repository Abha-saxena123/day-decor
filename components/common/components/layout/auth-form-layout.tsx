import { ReactNode } from "react";
import { AppLayout } from "./layout.styles";
import styled from "styled-components";
import { Image } from "antd";

export const AuthFormLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthFormLayoutDiv>
            <Image
                width={100}
                height={100}
                src="/logo.svg" alt="logo"
            />

            {children}

        </AuthFormLayoutDiv>
    );
};


const AuthFormLayoutDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width:100%;
    height:100%; 
    padding-top:12px;
    padding-bottom:36px;
    background-image: url("form-background.jpg");

` 