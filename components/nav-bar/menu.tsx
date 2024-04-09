import { Menu, MenuProps, Popover } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuOutlined } from '@ant-design/icons';

const items = [
    {
        key: 'flowers',
        icon: 'flower_icon',
        label: 'Flowers',
        type: 'main',
        children: [
            {
                key: 'rose',
                icon: 'rose_icon',
                label: 'Rose',
                type: 'sub',
            },
            {
                key: 'lily',
                icon: 'lily_icon',
                label: 'Lily',
                type: 'sub',
            },
            {
                key: 'tulip',
                icon: 'tulip_icon',
                label: 'Tulip',
                type: 'sub',
            },
        ],
    },
    {
        key: 'cakes',
        icon: 'cake_icon',
        label: 'Cakes',
        type: 'main',
        children: [
            {
                key: 'chocolate',
                icon: 'chocolate_icon',
                label: 'Chocolate Cake',
                type: 'sub',
            },
            {
                key: 'vanilla',
                icon: 'vanilla_icon',
                label: 'Vanilla Cake',
                type: 'sub',
            },
        ],
    },
    {
        key: 'gifts',
        icon: 'gift_icon',
        label: 'Gifts',
        type: 'main',
        children: [
            {
                key: 'perfume',
                icon: 'perfume_icon',
                label: 'Perfume',
                type: 'sub',
            },
            {
                key: 'watch',
                icon: 'watch_icon',
                label: 'Watch',
                type: 'sub',
            },
        ],
    },
    {
        key: 'personalized',
        icon: 'personalized_icon',
        label: 'Personalized',
        type: 'main',
        children: [
            {
                key: 'photo_frame',
                icon: 'photo_frame_icon',
                label: 'Photo Frame',
                type: 'sub',
            },
            {
                key: 'mug',
                icon: 'mug_icon',
                label: 'Custom Mug',
                type: 'sub',
            },
        ],
    },
    {
        key: 'occasions',
        icon: 'occasion_icon',
        label: 'Occasions',
        type: 'main',
        children: [
            {
                key: 'birthday',
                icon: 'birthday_icon',
                label: 'Birthday',
                type: 'sub',
            },
            {
                key: 'anniversary',
                icon: 'anniversary_icon',
                label: 'Anniversary',
                type: 'sub',
            },
        ],
    },
    {
        key: 'experiences',
        icon: 'experience_icon',
        label: 'Experiences',
        type: 'main',
        children: [
            {
                key: 'spa_day',
                icon: 'spa_day_icon',
                label: 'Spa Day',
                type: 'sub',
            },
            {
                key: 'cooking_class',
                icon: 'cooking_class_icon',
                label: 'Cooking Class',
                type: 'sub',
            },
        ],
    },
    {
        key: 'more',
        icon: 'more_icon',
        label: 'More',
        type: 'main',
        children: [
            {
                key: 'books',
                icon: 'books_icon',
                label: 'Books',
                type: 'sub',
            },
            {
                key: 'electronics',
                icon: 'electronics_icon',
                label: 'Electronics',
                type: 'sub',
            },
        ],
    },
    {
        key: 'toys',
        icon: 'toys_icon',
        label: 'Toys',
        type: 'main',
        children: [
            {
                key: 'lego',
                icon: 'lego_icon',
                label: 'Lego',
                type: 'sub',
            },
            {
                key: 'barbie',
                icon: 'barbie_icon',
                label: 'Barbie',
                type: 'sub',
            },
        ],
    },
    {
        key: 'electronics',
        icon: 'electronics_icon',
        label: 'Electronics',
        type: 'main',
        children: [
            {
                key: 'smartphone',
                icon: 'smartphone_icon',
                label: 'Smartphone',
                type: 'sub',
            },
            {
                key: 'laptop',
                icon: 'laptop_icon',
                label: 'Laptop',
                type: 'sub',
            },
        ],
    },
    {
        key: 'accessories',
        icon: 'accessories_icon',
        label: 'Accessories',
        type: 'main',
        children: [
            {
                key: 'bracelet',
                icon: 'bracelet_icon',
                label: 'Bracelet',
                type: 'sub',
            },
            {
                key: 'sunglasses',
                icon: 'sunglasses_icon',
                label: 'Sunglasses',
                type: 'sub',
            },
        ],
    },
    {
        key: 'home_decor',
        icon: 'home_decor_icon',
        label: 'Home Decor',
        type: 'main',
        children: [
            {
                key: 'cushions',
                icon: 'cushions_icon',
                label: 'Cushions',
                type: 'sub',
            },
            {
                key: 'wall_art',
                icon: 'wall_art_icon',
                label: 'Wall Art',
                type: 'sub',
            },
        ],
    },
    {
        key: 'stationery',
        icon: 'stationery_icon',
        label: 'Stationery',
        type: 'main',
        children: [
            {
                key: 'notebooks',
                icon: 'notebooks_icon',
                label: 'Notebooks',
                type: 'sub',
            },
            {
                key: 'pens',
                icon: 'pens_icon',
                label: 'Pens',
                type: 'sub',
            },
        ],
    },
    {
        key: 'jewelry',
        icon: 'jewelry_icon',
        label: 'Jewelry',
        type: 'main',
        children: [
            {
                key: 'earrings',
                icon: 'earrings_icon',
                label: 'Earrings',
                type: 'sub',
            },
            {
                key: 'necklaces',
                icon: 'necklaces_icon',
                label: 'Necklaces',
                type: 'sub',
            },
        ],
    },
    {
        key: 'cosmetics',
        icon: 'cosmetics_icon',
        label: 'Cosmetics',
        children: [
            {
                key: 'lipstick',
                icon: 'lipstick_icon',
                label: 'Lipstick',
                type: 'sub',
                children: [
                    {
                        key: 'lipstick',
                        icon: 'lipstick_icon',
                        label: 'Lipstick',
                        type: 'sub',
                    },
                    {
                        key: 'foundation',
                        icon: 'foundation_icon',
                        label: 'Foundation',
                        type: 'sub',
                    },
                ],
            },
            {
                key: 'foundation',
                icon: 'foundation_icon',
                label: 'Foundation',
                type: 'sub',
            },
        ],
    },
    {
        key: 'sports',
        icon: 'sports_icon',
        label: 'Sports',
        type: 'main',
        children: [
            {
                key: 'football',
                icon: 'football_icon',
                label: 'Football',
                type: 'sub',
            },
            {
                key: 'basketball',
                icon: 'basketball_icon',
                label: 'Basketball',
                type: 'sub',
            },
        ],
    },
    {
        key: 'gourmet',
        icon: 'gourmet_icon',
        label: 'Gourmet',
        type: 'main',
        children: [
            {
                key: 'chocolates',
                icon: 'chocolates_icon',
                label: 'Chocolates',
                type: 'sub',
            },
            {
                key: 'cheese',
                icon: 'cheese_icon',
                label: 'Cheese',
                type: 'sub',
            },
        ],
    },
    {
        key: 'health_beauty',
        icon: 'health_beauty_icon',
        label: 'Health & Beauty',
        type: 'main',
        children: [
            {
                key: 'skincare',
                icon: 'skincare_icon',
                label: 'Skincare',
                type: 'sub',
            },
            {
                key: 'haircare',
                icon: 'haircare_icon',
                label: 'Haircare',
                type: 'sub',
            },
        ],
    },
    {
        key: 'pet_supplies',
        icon: 'pet_supplies_icon',
        label: 'Pet Supplies',
        type: 'main',
        children: [
            {
                key: 'dog_food',
                icon: 'dog_food_icon',
                label: 'Dog Food',
                type: 'sub',
            },
            {
                key: 'cat_litter',
                icon: 'cat_litter_icon',
                label: 'Cat Litter',
                type: 'sub',
            },
        ],
    },
    {
        key: 'fashion',
        icon: 'fashion_icon',
        label: 'Fashion',
        type: 'main',
        children: [
            {
                key: 'clothing',
                icon: 'clothing_icon',
                label: 'Clothing',
                type: 'sub',
            },
            {
                key: 'shoes',
                icon: 'shoes_icon',
                label: 'Shoes',
                type: 'sub',
            },
        ],
    },
];

export const Menus = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    return (
        <MenuWrapper >
            <Popover content={<StyledMenu onClick={onClick} mode="vertical" items={items} />} trigger="click">
                <MenuOutlined />
            </Popover>
            <Logo>
                <Image
                    width={100}
                    height={100}
                    src="/logo.svg" alt="logo"
                />
            </Logo>
        </MenuWrapper >
    );
};

const StyledMenu = styled(Menu)`
margin-left:12px;
max-height:500px;
overflow-y:scroll;
scrollbar-width: thin;
`

const MenuWrapper = styled.div`
display:flex;
margin-left:12px;
align-items:center;
>span>svg>path{
fill:white}
`

const Logo = styled.div`
height:max-content;
width:max-content;
margin-left:24px;
background-color:black;
border-radius:50%;
margin-top:24px;
`
