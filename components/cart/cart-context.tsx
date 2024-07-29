import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: number;
    price: number;
    name: string;
    quantity: number;
    stock: number;
    image: { src: string; alt: string };
}

interface CartContextType {
    cartItems: CartItem[];
    cartValue: number,
    setCartValue: (x: number) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
    updateCartItemQuantity: (itemId: number, quantity: number) => void;
    clearCart: () => void;
    setCartItems: (item: any) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartValue, setCartValue] = useState<number>(0);


    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeFromCart = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateCartItemQuantity = (itemId: number, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartContextValue: CartContextType = {
        cartItems,
        cartValue,
        setCartValue,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        setCartItems
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

