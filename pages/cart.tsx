import { useCart } from '@/components/cart/cart-context';
import { CartPage } from '@/components/cart/cart-page';
import { useFetch } from '@/components/hooks/use-fetch';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export interface CartItem {
    id: number;
    price: number;
    name: string;
    quantity: number;
    stock: number;
    image: { src: string; alt: string };
}

const fetchCartItems = async (userId: number): Promise<CartItem[]> => {
    try {
        // Fetch the cart items for the user
        const response = await axios.get(`http://localhost:1337/api/carts?user=${userId}`, { params: { "populate": "*" } }).then(res => res.data);
        console.log("sssssssssssssresponse", response)
        if (response.data.length === 0) {
            return [];
        }

        const cart = response.data[0].attributes;
        console.log("cart", cart);
        const cartItems = cart.items;
        const itemsWithDetails = await Promise.all(cartItems.map(async (item: any, idx: number) => {
            const productResponse = await axios.get(`http://localhost:1337/api/products/${item.id}`, { params: { "populate": "*" } }).then(res => res.data);
            const product = productResponse.data;
            console.log("product", product)
            return {
                id: product.id,
                price: product.attributes.mrp,
                name: product.attributes.title,
                stock: product.attributes.quantity,
                quantity: cartItems[idx].quantity,
                image: { src: "http://localhost:1337" + (product.attributes.productImage?.data[0]?.attributes?.url || ''), alt: product.attributes.productImage?.data[0]?.hash || '' },
            };
        }));
        return itemsWithDetails;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
};

const Cart: React.FC = () => {
    const { cartItems, cartValue: totalPrice, setCartItems, removeFromCart, updateCartItemQuantity, setCartValue } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            const items = await fetchCartItems(5);
            setCartItems(items);
            setCartValue(items.reduce((total, item) => total + item.price * item.quantity, 0))
        };
        fetchData();
    }, []);

    return (
        <div>
            <CartPage
                cartItems={cartItems}
                updateQuantity={updateCartItemQuantity}
                removeItem={removeFromCart}
                totalPrice={totalPrice}
            />
        </div>
    );
};

export default Cart;
