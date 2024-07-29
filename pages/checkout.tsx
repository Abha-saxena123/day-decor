import React, { useState } from 'react';
import { Form, Input, Button, Typography, Select, Radio, Row, Col, Card } from 'antd';
import { useCart } from '@/components/cart/cart-context';
import axios from 'axios';
import styled from 'styled-components';
import { useFetch } from '@/components/hooks/use-fetch';

const { Title } = Typography;
const { Option } = Select;

declare global {
    interface Window {
        Razorpay: any; // Adjust the type as per Razorpay's documentation
    }
}

const savedAddresses = [
    { id: 1, label: 'Home', address: '123 Main St, Springfield, IL' },
    { id: 2, label: 'Work', address: '456 Elm St, Springfield, IL' },
    { id: 3, label: 'Other', address: '789 Oak St, Springfield, IL' },
];

const createOrder = async (orderData: any) => {
    try {
        // POST request to create the order
        const response = await axios.post('http://localhost:1337/api/orders', { data: orderData });

        console.log('Order created successfully:', response.data);

        return response.data; // Optionally return the created order data
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Handle or propagate the error as needed
    }
};

const createOrderItems = async (orderData: any) => {
    try {
        // POST request to create the order
        const response = await axios.post('http://localhost:1337/api/order-items', { data: orderData });

        console.log('Order Items created successfully:', response.data);

        return response.data; // Optionally return the created order data
    } catch (error) {
        console.error('Error creating order Item:', error);
        throw error; // Handle or propagate the error as needed
    }
};

const formatAddressData = (data: any) => {
    let formattedData = data.map((d: any) => {
        return {
            ...d?.attributes, id: d.id, address: d?.attributes?.addressLine + ", " + d?.attributes?.city + ", " + d?.attributes?.state + ", " + d?.attributes?.country + ", " + d?.attributes?.pincode
        }
    })
    return formattedData;
}

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin:24px;
.ant-card-bordered{
border: 1px solid #f2266b;
    box-shadow: 5px 5px 5px 5px;
}
.ant-card-head{
border-bottom: 1px solid #f2266b;
padding:0;
margin: 0 24px;}

`
const CheckoutContainer = styled(Card)`

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const handlePayment = async (cartValue: any, newOrder: any) => {
    const orderAmount = cartValue;
    try {
        const createdOrder = await createOrder(newOrder);
        console.log('Order placed successfully:', createdOrder);
    } catch (error) {
        console.error('Failed to place order:', error);
    }
};

const CheckoutPage: React.FC = () => {
    const [form] = Form.useForm();
    const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
    const [radioValue, setRadioValue] = useState("saved");

    const { cartItems, cartValue, clearCart } = useCart();
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const { data: addresses, isLoading } = useFetch<any[]>({ id: "address-books", params: { "populate": "*", "filters[user][id][$in]": 5 }, cb: formatAddressData })

    const newOrder = {
        user: 5,
        orderItems: [2, 3],
        totalAmount: 750.0, // Example total amount
        status: 'Pending', // Example status
        paymentStatus: 'Paid' // Example payment status
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleAddressSelect = (value: string) => {
        const address = addresses?.find(addr => addr.id.toString() === value)?.address || '';
        setSelectedAddress(address);
        form.setFieldsValue({ address });
    };

    const handleAddressChange = (e: any) => {
        setIsNewAddress(e.target.value === 'new');
        setRadioValue(e.target.value)
        form.resetFields(['address']);
        setSelectedAddress(null);
    };

    return (
        <Wrapper>
            <CheckoutContainer title={"Checkout"} style={{ width: "100%", padding: "24px 40px" }}>
                {/* <Title level={2}>Checkout</Title> */}
                <Form
                    form={form}
                    name="checkout"
                    initialValues={{ remember: true }}
                    onFinish={() => handlePayment(cartValue, newOrder)}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address Option"
                        name="addressOption"

                    >
                        <Radio.Group onChange={handleAddressChange} defaultValue="saved">
                            <Radio value="saved">Select from saved addresses</Radio>
                            <Radio value="new">Add new address</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {isNewAddress ? (
                        <Form.Item
                            label="New Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input />
                        </Form.Item>
                    ) : (
                        <Form.Item
                            label="Select Address"
                            name="savedAddress"
                            rules={[{ required: !isNewAddress, message: 'Please select an address!' }]}
                        >
                            <Select
                                placeholder="Select a saved address"
                                onChange={handleAddressSelect}
                                disabled={isNewAddress}
                            >
                                {savedAddresses.map(address => (
                                    <Option key={address.id} value={address.id.toString()}>
                                        <div>
                                            <strong>{address.label}</strong>: {address.address}
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </CheckoutContainer>
        </Wrapper>
    );
};

export default CheckoutPage;
