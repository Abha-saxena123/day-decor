import styled from "styled-components"
import { useFetch } from "../hooks/use-fetch";

export const MyOrders = () => {
    const { data: list, isLoading } = useFetch({
        id: "orders", params: {
            "populate": "*"
        }, keySuffix: "related-product",
    });
    return (<OrderWrapper>
        <StyledTitle>Order History</StyledTitle>
    </OrderWrapper>)
}


const StyledTitle = styled.h2`
color:#F2266B;
margin: 8px;
text-align:center;
align-self:flex-start;
justify-self:flex-start;
`

const OrderWrapper = styled.div`
align-items:flex-start;
justify-content:flex-start;
display:flex;
flex:1;

`
export const OrderTile = styled.div`
`