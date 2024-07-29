import { Menu, MenuProps, Popover } from 'antd';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { CaretDownOutlined, } from '@ant-design/icons';
import { useFetch } from '../hooks/use-fetch';
import { useRouter } from 'next/router';

const generateMenu = (data: any[]) => {
    const childIds: any[] = [];
    const generateNavData = (categories: { attributes: any; }[], data: any) => {
        return categories.map(({ attributes }) => ({
            key: attributes.uid,
            label: attributes.name,
            children: generateChildData(attributes.uid, data)
        }));
    };

    const generateChildData = (parentId: any, data: any) => {
        const parent = data.find((item: { attributes: { uid: any; }; }) => item.attributes.uid === parentId);
        if (!parent || !parent.attributes.categories?.data) return null;
        childIds.push(parent.attributes.uid);

        return parent.attributes.categories.data.length === 0 ? null : parent.attributes.categories.data.map(({ attributes }: any) => {
            const child = generateChildData(attributes.uid, data)
            return {
                key: attributes.uid,
                label: attributes.name,
                children: generateChildData(attributes.uid, data),
                ...(child && { type: 'group' })
            }
        });
    };


    const navData = data.map(({ attributes }: any) => ({
        key: attributes.uid,
        label: attributes.name,
        icon: <CaretDownOutlined />,
        children: generateNavData(attributes.categories?.data || [], data)
    }));


    return navData.filter((nav: { key: any; }) => !childIds.includes(nav.key))

}
export const CategoryMenus = () => {
    const router = useRouter();
    const onClick: MenuProps['onClick'] = (e) => {
        router.push(`/categories/${e.key}`)
    };
    const { data: items, isLoading } = useFetch<any[]>({ id: 'categories', keySuffix: "menu", params: { "populate": "*" }, cb: generateMenu });
    if (isLoading) {
        return <p>...Loading</p>
    }
    return <StyledMenu onClick={onClick} mode="horizontal" items={items} />

};

const StyledMenu = styled(Menu)`
padding-left:112px;
font-size: 16px;
font-weight: 600;
`

