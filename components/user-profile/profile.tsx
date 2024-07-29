import { Tabs } from "antd";
import { MyOrders } from "./my-orders";
import { styled } from 'styled-components'
import { SavedDates } from "./save-date";
import { Documents } from "./documents";
import { Help } from "./help";
import { Logout } from "./logout";
import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import { signOut } from "next-auth/react";
import { ProfileOverview } from "./profile-overview";
import AddressBook from "./address-book";

const TAB_CONTENT = [
    {
        label: "Profile Overview",
        id: "ProfileOverview"
    },
    {
        label: "My Orders",
        id: "MyOrders"
    },
    {
        label: "Address Book",
        id: "AddressBook"
    },
    {
        label: "Saved Dates",
        id: "SavedDates"
    },
    {
        label: "Offers Available",
        id: "OffersAvailable"
    },
    {
        label: "Customer Care",
        id: "CustomerCare"
    },
    {
        label: "Privacy Policy",
        id: "PrivacyPolicy"
    },
    {
        label: "Terms and Condition",
        id: "TermsAndCondition"
    },
    ,
    {
        label: "Logout",
        id: "Logout"
    }]

export const ProfilePage = ({ userId }: { userId: string | number }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
        // Perform logout action here
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleTabChange = (activeKey: string) => {
        if (activeKey === "Logout") {
            showModal();
            // signOut({ callbackUrl: '/' });
        }
    }

    return <><TabWrapper
        tabPosition='left'
        onChange={handleTabChange}
        onTabClick={handleTabChange}
        destroyInactiveTabPane={false}
        items={
            TAB_CONTENT.map(({ id, label }: any, i) => {
                const Component = renderComponent[id];
                return {
                    label,
                    key: id,
                    children: <Wrapper key={id}>{Component ? <Component id={id} userId={userId} /> : <div>{label} will be available soon</div>}</Wrapper>
                }
            })}
    />
        <Modal
            title="Confirm Logout"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
        >
            <p>Are you sure you want to logout?</p>
        </Modal>
    </>

}

const renderComponent = {
    "MyOrders": MyOrders,
    "SavedDates": SavedDates,
    "PrivacyPolicy": Documents,
    "TermsAndCondition": Documents,
    "CustomerCare": Help,
    "Logout": Logout,
    "ProfileOverview": ProfileOverview,
    "AddressBook": AddressBook
}


const Wrapper = styled.div`
align-items: flex-start;
justify-content: flex-start;
display: flex;
flex-direction: column;
flex: 1;
padding: 0 24px;
`

const TabWrapper = styled(Tabs)`
padding:24px 48px;
.ant-card-head{
border-bottom:0px;
min-height:20px;
margin-top:10px;}
.ant-card .ant-card-body{
padding:0px 24px;
}
.ant-card-bordered{
border: 1px solid #f2266b}

`
