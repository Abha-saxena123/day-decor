import styled from "styled-components";
import { Button, Card, Divider } from "antd";
import { ProductDescriptionCard } from "@/components/common/components/card/product-description-card";
import { useFetch } from "@/components/hooks/use-fetch";
import { ProductCardProps } from "@/components/product/product-card";


const formateData = (data: any) => {
    const prodData = data[0].attributes?.products?.data || [];
    return prodData.map(({ attributes }: any) => {

        return {
            ...attributes,
            tags: attributes.tags.data.map(({ attributes }: any) => ({
                name: attributes.tagName
            })).slice(0, 2),
            link: "http://localhost:3000/products/" + attributes.slug,
            isWishListed: attributes.wish_lists?.data?.length > 0,
            productImage: "http://localhost:1337" + attributes.productImage?.data[0]?.attributes?.url,
        }
    })
}

export default function WishListedProductList() {
    const { data: list, isLoading } = useFetch<ProductCardProps[]>({ id: "wish-lists", params: { "filters[user][id][$in]": 5, "populate[products][populate]": "tags,productImage,wish_lists" }, cb: formateData });
    if (isLoading) {
        return <Wrapper>
            <Card loading={isLoading} style={{ width: "100%" }} />
        </Wrapper >
    }

    return (
        <Wrapper>
            <CatData list={list} />
        </Wrapper >
    );
};

const CatData = ({ list }: { list?: ProductCardProps[]; }) => {

    return <Card title={"Fantasia Finds"} style={{ width: "100%", padding: "24px 40px" }}>
        <CategoryListWrapper>
            {list?.length === 0 ? <div>No Products available under this category</div> : list?.map((catagory: ProductCardProps, idx: number) => { return <ProductDescriptionCard {...catagory} key={idx} /> })}
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
padding:0;
margin: 0 24px;}

`
const Styledtext = styled.h2`
margin-top: 0px;`

const StyledDivider = styled(Divider)`
min-width:500px ;
width:500px;
margin: 8px;
margin-bottom:24px !important;
`