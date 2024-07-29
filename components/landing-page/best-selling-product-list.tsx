import styled from "styled-components";
import { ProductCardProps, ProductDescriptionCard } from "../common/components/card/product-description-card";
import { Divider } from "antd";
import { useFetch } from "../hooks/use-fetch";
import { ProductDescriptionSkeletonLoader } from "../common/components/skeleton/product-description-skeleton";

const formateData = (data: any) => {
    return data.map(({ attributes }: any) => {
        return {
            ...attributes,
            tags: attributes.tags.data.map(({ attributes }: any) => ({
                name: attributes.tagName
            })).slice(0, 2),
            link: "http://localhost:3000/products/" + attributes.slug,
            productImage: "http://localhost:1337" + attributes.productImage?.data[0]?.attributes?.url,
            isWishListed: attributes.wish_lists?.data?.length > 0
        }
    }).splice(0, 4)
}


export const BestSellingProductList: React.FC = () => {
    const { data: list, isLoading } = useFetch<ProductCardProps[]>({ id: "products", params: { "populate": "*", "filters[tags][tagName][$in]": "Best Selling" }, cb: formateData });
    console.log("=========list===========", list)
    return (
        <Wrapper>
            <StyledDivider>Best Selling Products</StyledDivider>
            {<Styledtext>Pick The Trending ones</Styledtext>}
            <CatorgyListWrapper>
                {isLoading ? Array.from({ length: 4 }).map((_, i) => <ProductDescriptionSkeletonLoader key={i} />) : list?.map((catagory: ProductCardProps, idx) => { return <ProductDescriptionCard {...catagory} key={idx} /> })}
            </CatorgyListWrapper>
        </Wrapper >
    );
};

const Styledtext = styled.h2`
margin-top: 0px;
font-size: 24px;
font-weight: 600;

`

const CatorgyListWrapper = styled.div`
align-items: center;
display: flex;
gap:48px;
overflow-x:scroll;
max-width: 95vw;
&::-webkit-scrollbar {
        height: 0px; /* width of the scrollbar */
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1; /* color of the scrollbar track */
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888; /* color of the scrollbar handle */
        border-radius: 5px; /* roundness of the scrollbar handle */
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555; /* color of the scrollbar handle on hover */
    }
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`


const StyledDivider = styled(Divider)`
min-width:500px ;
font-size: 22px;
font-weight: 600;
width:500px;
margin: 8px;
text-transform: uppercase;
`