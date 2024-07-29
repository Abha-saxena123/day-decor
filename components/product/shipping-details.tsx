

import styled from 'styled-components';
import { Button, Input, Typography } from 'antd';
import { PushpinFilled, } from '@ant-design/icons';


export const ShippingDetails = () => {
    return <Wrapper>
        <div style={{ display: "flex", gap: "16px" }}>
            <Typography.Title level={4} style={{ marginTop: 0 }}>Check Availability</Typography.Title>
            <Input prefix={<PushpinFilled />} style={{ maxWidth: "150px" }} />
        </div>
        <Button type="link" style={{ width: "max-content", padding: 0, fontSize: "16px", fontWeight: "500" }}>Saved Addresses</Button>
    </Wrapper>
};

const Wrapper = styled.div`
    display: flex;
flex-direction:column;
>button>span{
text-decoration:underline}
`
