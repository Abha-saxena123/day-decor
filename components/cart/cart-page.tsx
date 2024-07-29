import React, { useState } from 'react';
import { List, Button, InputNumber, Typography, Divider, Row } from 'antd';
import styled from 'styled-components';
import { toCurrency } from '../common/utils/helpers/formatting.helpers';
import { DeleteTwoTone } from '@ant-design/icons';
import { CartItem } from '@/pages/cart';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

interface CartPageProps {
    cartItems: CartItem[];
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    totalPrice: number;
}

const CartContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const CartItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ItemDetails = styled.div`
    display: flex;
    align-items: center;
    height: fit-content;

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
    }
`;

const ItemImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 20px;

    @media (max-width: 768px) {
        margin-right: 10px;
    }
`;

const ItemName = styled(Title)`
    margin-right: 20px !important;

    @media (max-width: 768px) {
        margin-right: 10px !important;
        font-size: 1.2rem !important;
    }
`;

export const CartPage: React.FC<CartPageProps> = ({ cartItems, updateQuantity, removeItem, totalPrice }) => {
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const proceedToCheckout = () => {
        router.push('/checkout');
    };

    return (
        <CartContainer>
            <Title level={2}>Shopping Cart</Title>
            <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                    <ListItem
                        setGlobalError={setIsError}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                    />
                )}
            />
            <Divider />
            <Row justify="space-between" align="middle">
                <Title level={4} style={{ marginTop: 0 }}>Total: {toCurrency(totalPrice)}</Title>
                <Button type="primary" size="large" disabled={isError} onClick={proceedToCheckout}>
                    Proceed to Checkout
                </Button>
            </Row>
        </CartContainer>
    );
};

const ListItem = ({
    item,
    updateQuantity,
    removeItem,
    setGlobalError,
}: {
    item: CartItem;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    setGlobalError: (x: boolean) => void;
}) => {
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <List.Item key={item.id} style={{ display: "flex", flexDirection: "column", width: '100%' }}>
            <CartItemContainer>
                <Link href={`/products/${item.id}`} passHref>
                    <ItemDetails>
                        <ItemImage src={item.image.src} alt={item.image.alt} />
                        <ItemName level={4} style={{ margin: 0 }}>{item.name}</ItemName>
                    </ItemDetails>
                </Link>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "10px" }}>
                    <InputNumber
                        style={{ width: "50px" }}
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        status={isError ? "error" : ""}
                        onChange={(value) => {
                            setIsError(!value || value < 1 || value > item.stock);
                            updateQuantity(item.id, value as number);
                            setGlobalError(!value || value < 1 || value > item.stock);
                            setErrorMsg(
                                !value || value === null || value < 1
                                    ? "Quantity must be greater than 0"
                                    : value > item.stock
                                        ? "Insufficient Stock"
                                        : ""
                            );
                        }}
                    />
                    <Text style={{ minWidth: "80px" }}>{toCurrency(item.price * item.quantity)}</Text>
                    <Button onClick={() => removeItem(item.id)}>
                        <DeleteTwoTone twoToneColor="#f2266b" />
                    </Button>
                </div>
            </CartItemContainer>
            {isError && <Paragraph type="danger">{errorMsg}</Paragraph>}
        </List.Item>
    );
};
