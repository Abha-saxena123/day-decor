import styled from "styled-components";
import { Carousel, Divider, Segmented, Typography } from "antd";
import { useFetch } from "@/components/hooks/use-fetch";
import { ProductCard, ProductCardProps } from "@/components/product/product-card";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { ProductCardImage, ProductCardImageProps } from "@/components/product/image-card";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { ShippingDetails } from "@/components/product/shipping-details";
import { RelatedProductList } from "@/components/product/related-product";

const ContentStyle = styled.div<{ url: string }>`
    background: url(${(props) => props.url}) no-repeat;
    height: 340px;
    width: 100%;
    background-size: cover;
`;
const formateData = (data: any) => {
    let formattedData = {
        ...data[0].attributes,
        id: data[0].id,
        category: data[0].attributes.uid,
        tags: data[0].attributes.tags.data.map(({ attributes }: any) => ({
            name: attributes.tagName
        })).slice(0, 2),
        otherImages: data[0].attributes.otherImages.data.map((image: any) => ({ src: "http://localhost:1337" + image.attributes.url, alt: image.attributes.hash })),
        productImage: { src: "http://localhost:1337" + data[0].attributes.productImage?.data[0]?.attributes?.url, alt: data[0].attributes.productImage?.data[0]?.hash },
    }

    return formattedData;
}


export default function CategoryProductList(props: any) {

    const { data, isLoading } = useFetch<ProductCardProps & ProductCardImageProps>({ id: 'products', params: { "populate": "*", "filters[slug][$eq]": props.productId }, cb: formateData });
    const [segment, setSegment] = useState("Shipping Details");
    if (isLoading && !data) {
        return <>Loading</>
    }

    const onSegmentChange = (value: any) => {
        setSegment(value)
    }
    return (
        <Wrapper>
            <ProductWrapper>
                {data && <ProductCardImage productImage={data?.productImage} otherImages={data.otherImages} />}
                {data && <ProductCard {...data} star={4.5} productId={props.productId} />}
            </ProductWrapper >
            <ContentWrapper>
                <SegmentWrapper<string>
                    options={['Shipping Details', 'Product Details', 'Reviews']}
                    onChange={onSegmentChange}
                />
                <Typography.Title level={3}>{segment}</Typography.Title>
                <GetSegmentContent segment={segment} productInfo={data?.productInfo} />
                <RelatedProductHeading level={3}>Related Products</RelatedProductHeading>
                <RelatedProductList category={data?.category} />
            </ContentWrapper>
        </Wrapper>
    );
};

const GetSegmentContent: FC = ({ segment, productInfo, reviews }: { segment: string; productInfo?: string; reviews?: any }) => {
    switch (segment) {
        case "Shipping Details":
            return <ShippingDetails />;
        case "Product Details":
            return <ReactMarkdown remarkPlugins={[gfm]} children={productInfo} />;
        case "Reviews":
            return <div>Reviews</div>;
    }
}

export const getServerSideProps = (async (ctx) => {
    return { props: { productId: ctx.query.productId } }
})

const RelatedProductHeading = styled(Typography.Title)`
margin:18px 0;
`
const Wrapper = styled.div`
display: flex;
flex-direction:column;
width: 100%;
align-items: flex-start;
justify-content: space-around;
margin:24px 0;
`
const ContentWrapper = styled.div`
display: flex;
flex-direction:column;
width: max-content;
margin:24px 0 24px 72px;
`

const ProductWrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-around;
`

const SegmentWrapper = styled(Segmented)`
padding:12px;
border: 2px solid #f2266b;
border-radius: 24px;
width:max-content;
`