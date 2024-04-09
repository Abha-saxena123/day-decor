
import { Button, Descriptions, Divider } from "antd";
import styled from "styled-components";


export interface ProductCardProps {
    title?: string;
    rating?: number;
    star?: number;
    sp?: number;
    mp?: number;
    discount?: number;
    description?: string;
    productInfo?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    title,
    rating,
    star,
    sp,
    mp,
    discount,
    description,
    productInfo,
}) => {
    return (
        <InfoWrapper>
            <h1>{title}</h1>
            <h3>{rating} Ratings</h3>
            <Divider></Divider>
            <h4>$1375 (28% off)</h4>
            <h1>$995</h1>
            <StyledButton>Description</StyledButton>
            <StyledButton>ProductInfo</StyledButton>
            <Styledh5>{description}</Styledh5>
            <Divider></Divider>
            <h4>Delivey Info</h4>
            <AddCartButton>Save to Wishlist</AddCartButton>
            <AddCartButton>Add To Cart</AddCartButton>
        </InfoWrapper>
    );
};
const Styledh5 = styled.h5`
// text-align:center;
color:grey;
`
const Styledh3 = styled.div`
gap:8px;
padding: 4px;
`
const StyledButton = styled(Button)`
color:grey;
width:50%;
gap:16px;
background-color:grey;
color:White;

`

const AddCartButton = styled(Button)`
color:pink;
width:50%;
gap:16px;
background-color:white;
font:solid;
border:1px solid pink;

`

const InfoWrapper = styled.div`
width:50%`