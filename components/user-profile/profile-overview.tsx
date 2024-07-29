import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Typography, Button, Input, Divider, Form, Row, Col, DatePicker, message } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { StyledInput } from '../common/components/form/form.styles';
import { useSession } from 'next-auth/react';
import { useFetch } from '../hooks/use-fetch';
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios';
import { BASE_URL } from '../common/utils/constants/api.constant';
import { useMutation } from '../hooks/use-mutation';
const { Sider, Content } = Layout;
const { Title, Text } = Typography;

interface ProfileOverviewProps {
    username: string;
    lastname?: string;
    mobile?: string;
    email: string;
    city?: string;
    dateOfBirth?: Date | string | Dayjs
}

export const ProfileOverview = ({ userId }: { userId: number | string }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'User Details Saved Successfully',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Something went wrong, please try again',
        });
    };
    const { data: user, isLoading, mutate } = useFetch<ProfileOverviewProps>({ id: `users/${userId}` });
    const { mutations: { put }, isMutating } = useMutation({ id: `users/${userId}` });
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<ProfileOverviewProps>({
        username: '',
        lastname: '',
        mobile: '',
        email: '',
        city: '',
        dateOfBirth: "",
    });

    useEffect(() => {
        !isLoading && setProfile({
            username: user?.username as string,
            lastname: user?.lastname as string,
            mobile: user?.mobile,
            email: user?.email as string,
            city: user?.city,
            dateOfBirth: dayjs(user?.dateOfBirth),
        })
    }, [isLoading, user?.username, user?.lastname, user?.mobile, user?.email, user?.city, user?.dateOfBirth])

    if (isLoading) {
        return <div>Loading...</div>
    }
    const handleInputChange = async (value: any) => {
        setProfile({ ...profile, ...value });
        setIsEditing(false);
        try {
            const resp = await put({ ...profile, ...value });
            if (resp.status === 200) {
                mutate();
                setProfile(value)
                success();
            }
        } catch (e) {
            error()
            console.log(e)
        }
    };
    const onInputChange = (e: any) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    }
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return <ContentContainer key={`${isMutating}`}>
        {contextHolder}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <Title level={2} style={{
                color: "#f2266b"
            }}>Profile Overview </Title>
            <Button onClick={handleEditClick} icon={<EditOutlined />}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
        </div>
        <Form style={{ width: "100%" }} onFinish={handleInputChange}>
            <ProfileContent>
                <ProfileFormTop>
                    <ProfileImage>
                        <img src="/logo.png" alt="Profile" />
                    </ProfileImage>
                    <ProfileInitialDetail>
                        <ProfileDetail name="username" >
                            <div>
                                <h2>First Name</h2>
                                <Input
                                    name="username"
                                    value={profile.username}
                                    disabled={!isEditing}
                                    size="large"
                                    onChange={onInputChange}
                                />
                            </div>
                        </ProfileDetail>
                        <ProfileDetail name="lastname">
                            <div>
                                <h2>Last Name</h2>
                                <Input
                                    name="lastname"
                                    value={profile.lastname}
                                    disabled={!isEditing}
                                    size="large"
                                    onChange={onInputChange}
                                />
                            </div>
                        </ProfileDetail>
                    </ProfileInitialDetail>

                </ProfileFormTop>
                <ProfileFormBottom>
                    <ProfileInitialDetail>
                        <ProfileDetail name="mobile">
                            <div>
                                <h2>Mobile No.</h2>
                                <Input
                                    name="mobile"
                                    size="large"
                                    onChange={onInputChange}
                                    value={profile.mobile}
                                    disabled={!isEditing}
                                />
                            </div>
                        </ProfileDetail>
                        <ProfileDetail name="email">
                            <div>
                                <h2>Email ID</h2>
                                <Input
                                    name="email"
                                    size="large"
                                    onChange={onInputChange}
                                    value={profile.email}
                                    disabled={!isEditing}
                                />
                            </div>
                        </ProfileDetail>

                    </ProfileInitialDetail>
                    <ProfileInitialDetail>
                        <ProfileDetail name="city">
                            <div>
                                <h2>City</h2>
                                <Input
                                    name="city"
                                    size="large"
                                    onChange={onInputChange}
                                    value={profile.city}
                                    disabled={!isEditing}
                                />
                            </div>
                        </ProfileDetail>
                        <ProfileDetail name="dob">
                            <div>
                                <h2>Date of Birth</h2>
                                <DatePicker size="large" value={profile.dateOfBirth} disabled={!isEditing} />
                            </div>
                        </ProfileDetail>

                    </ProfileInitialDetail>
                </ProfileFormBottom>
                {isEditing && (
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                )}
            </ProfileContent>
        </Form >
    </ContentContainer >

};

const ProfileFormBottom = styled.div`
display:flex;
gap:24px;
`


const ContentContainer = styled(Content)`
  background: #fff;
width:100%;
`;

const ProfileContent = styled.div`
  display: flex;
  gap: 24px;
  flex-direction:column;
  width:100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-radius: 10%;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;

const ProfileInitialDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex:1;
max-width:500px;
`;

const ProfileFormTop = styled.div`
  display: flex;
  width:100%;
  gap: 200px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileDetail = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width:100%;
.ant-input,.ant-picker{
background-color:#fff0f2 !important;
border:none;
width:100%;
}
h2{
    margin: 0;
color:#f2266b
}
`;
