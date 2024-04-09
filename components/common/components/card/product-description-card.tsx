

import { ProductCard } from "@/components/product/product-card";
import { Button, Card } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";




export interface ProductCardProps {
    title?: string;
    image?: string;
    star?: number;
    rating?: number;
    sp?: number;
    mp?: number;
    discount?: number;
    tags?: { name: string; icon: ReactNode }[];
    isWishListed?: boolean;
}

export const ProductDescriptionCard: React.FC<ProductCardProps>
    = ({
        title,
        image,
        star,
        sp,
        mp,
        discount,
        tags,
        rating,

        isWishListed
    }) => {
        return (
            <Wrapper>
                <img src={image} />
                <Styledtext>{title}</Styledtext>
                <StyledDivider><StyledRating>${sp}</StyledRating>
                    <StyledQuote>6% OFF</StyledQuote>
                </StyledDivider>
                <StyledDiv>
                    <StyledTitle>{star} &#11088;({rating})</StyledTitle>
                    <StyledTitle>&#128421; Personalizable</StyledTitle>
                </StyledDiv>
                {tags?.map(tag => <StyledTags> {tag.icon} {tag.name} </StyledTags>)}

            </Wrapper>
        );
    };


const Wrapper = styled.div`
border: 1px solid grey;
border-radius: 16px;
width: 200px;
height: max-content;
padding: 0px;
margin:0;
>img{
border-top-left-radius: 16px;
border-top-right-radius: 16px;
max-width: 200px;
height:200px;
}
`



const Styledtext = styled.h4`
color: grey;
margin-top: 8px;
margin:0;
`
const StyledRating = styled.h3`
margin-top: 8px;
margin-bottom:0;`

const StyledTitle = styled.h6`
color: grey;
width:100%;
margin:0;
`

const StyledTags = styled.div`
color:indigo;
width:max-content;
gap:16px;
background-color:pink;
font:solid;
margin-bottom: 12px;
padding: 4px;
font-size:12px;
font-weight:600;
`
const StyledDiv = styled.div`
display:flex;
margin: 4px 0px;
margin-top: 0;
`
const StyledDivider = styled.div`
display:flex;
gap:80px;`

const StyledQuote = styled.h4`
border:2px solid green;
padding:4px;
border-radius:10px;
color:green;
margin-top: 8px;`