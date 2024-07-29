import React from 'react';
import { Carousel } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useFetch } from '../hooks/use-fetch';
import { BannerSkeletonLoader } from '../common/components/skeleton/banner-skeleton';

const ContentStyle = styled.div<{ url: string }>`
    background: url(${(props) => props.url}) no-repeat;
    height: 340px;
    width: 100%;
    background-size: cover;
`;

interface BannerData {
    image: string;
    link: string;
}

const formateData = (data: any) => {
    return data.map(({ attributes }: any) => {
        return {
            link: attributes.link,
            image: "http://localhost:1337" + attributes.image
                ?.data?.attributes?.url,
        }
    })
}

export const Banners: React.FC = () => {
    const { data: banners, isLoading } = useFetch<any[]>({ id: 'banners', params: { "populate": "*" }, cb: formateData });
    // console.log(banners)
    return (
        <Carousel autoplay>
            {isLoading ? [...Array(3)].map((_, index) => (
                <BannerSkeletonLoader key={index} />
            )) : banners?.map(({ image, link }) => <Link href={link} key={image}>
                <ContentStyle url={image} />
            </Link>)}
        </Carousel>
    );
};
