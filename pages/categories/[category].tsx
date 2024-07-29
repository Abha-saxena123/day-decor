import styled from "styled-components";
import { Button, Card, Divider } from "antd";
import { ProductDescriptionCard } from "@/components/common/components/card/product-description-card";
import { useFetch } from "@/components/hooks/use-fetch";
import { ProductCardProps } from "@/components/product/product-card";
import { useRouter } from "next/router";
import { ProductDescriptionSkeletonLoader } from "@/components/common/components/skeleton/product-description-skeleton";
import { useState } from "react";

const formateData = (data: any) => {
    return data.map(({ attributes }: any) => {
        return {
            ...attributes,
            tags: attributes.tags.data.map(({ attributes }: any) => ({
                name: attributes.tagName
            })).slice(0, 2),
            link: "http://localhost:3000/products/" + attributes.slug,
            productImage: "http://localhost:1337" + attributes.productImage?.data[0]?.attributes?.url,
        }
    })
}


export default function CategoryProductList() {
    const router = useRouter();
    const category = router?.query?.category;
    const { data: list, isLoading } = useFetch<ProductCardProps[]>({ id: "products", keySuffix: `category-${category}`, params: { "populate": "*", "filters[categories][uid][$in]": category }, cb: formateData });
    if (isLoading) {
        return <Wrapper>
            <Card loading={isLoading} style={{ width: "100%" }} />
        </Wrapper >
    }

    return (
        <Wrapper>
            <CatData list={list} key={category as string} category={category as string} />
        </Wrapper >
    );
};

const CatData = ({ list, category }: { list?: ProductCardProps[]; category: string }) => {
    const [slicedData, setSlicedData] = useState(list?.slice(0, 5) || []);
    const onClick = () => {
        setSlicedData(list || [])
    }

    return <Card title={`Purchase under ${category}`} extra={slicedData?.length !== list?.length && <Button type="link" onClick={onClick}>View All</Button>} style={{ width: "100%", padding: "24px 40px" }}>
        <CategoryListWrapper>
            {slicedData?.length === 0 ? <div>No Products available under this category</div> : slicedData?.map((catagory: ProductCardProps, idx: number) => { return <ProductDescriptionCard {...catagory} key={idx} /> })}
        </CategoryListWrapper>
    </Card >
}

const CategoryListWrapper = styled.div`
align-self: flex-start;
display: flex;
gap:40px;
flex-wrap:wrap;
`
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
margin: 0 24px;
padding:0}

`
const Styledtext = styled.h2`
margin-top: 0px;`

const StyledDivider = styled(Divider)`
min-width:500px ;
width:500px;
margin: 8px;
margin-bottom:24px !important;
`