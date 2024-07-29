
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';


export const Logout = ({ setIsModalVisible, isModalVisible }: { setIsModalVisible: any; isModalVisible: boolean }) => {

    const handleOk = () => {
        setIsModalVisible(false);
        // Perform logout action here
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (<Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
    >
        <p>Are you sure you want to logout?</p>
    </Modal>

    );
};



