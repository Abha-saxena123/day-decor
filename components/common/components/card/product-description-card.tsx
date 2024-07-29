

import { ProductCard } from "@/components/product/product-card";
import { Button, Card, Tooltip } from "antd";
import { ReactNode, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getTruncatedText, toCurrency } from "../../utils/helpers/formatting.helpers";
import { HeartOutlined, HeartTwoTone, HeartFilled } from '@ant-design/icons';



export interface ProductCardProps {
    title: string;
    productImage?: string;
    star?: number;
    rating?: number;
    sp?: number;
    mp?: number;
    discount?: number;
    tags?: { name: string; icon: ReactNode }[];
    isWishListed?: boolean;
    link?: string
}

export const ProductDescriptionCard: React.FC<ProductCardProps>
    = ({
        title,
        productImage,
        star,
        sp,
        mp,
        discount,
        tags,
        rating,
        isWishListed: initialWishListed,
        link
    }) => {
        const { smallText, fullText, isToolTipNeeded } = getTruncatedText(title, 24);
        const [isWishListed, setIsWishListed] = useState(initialWishListed);

        const handleWishlistClick = (e: any) => {
            e.preventDefault();
            setIsWishListed(!isWishListed);
            // You can also add your API call here to update the wishlist status on the server
        };
        return (
            <Wrapper href={link}>
                <WishListDiv onClick={handleWishlistClick}>
                    {!isWishListed ? <HeartTwoTone twoToneColor="red" /> :
                        <HeartFilled />}
                </WishListDiv>
                <img src={productImage} alt={productImage} />
                <TextWrapper>
                    {isToolTipNeeded ?
                        <Tooltip title={fullText}>
                            <StyledText>{smallText}</StyledText>
                        </Tooltip>
                        : <StyledText>{title}</StyledText>}
                    <StyledDivider>
                        <StyledSP>{toCurrency(sp)}</StyledSP>
                        <StyledQuote>{discount}% OFF</StyledQuote>
                    </StyledDivider>
                    <StyledDiv>
                        <StyledTitle>{star} &#11088;({rating})</StyledTitle>
                    </StyledDiv>
                    <Tags>
                        {tags?.map((tag, idx) => <StyledTag key={idx}> {tag.icon} {tag.name} </StyledTag>)}
                    </Tags>
                </TextWrapper>
            </Wrapper>
        );
    };

export const TextWrapper = styled.div`
padding:8px;
`

export const WishListDiv = styled.div`
z-index:2;
background-color:white;
position:absolute;
left:175.5px;
display:flex;
border:1px solid grey;
border-bottom-left-radius: 16px;
border-top-right-radius: 16px;
padding:2px;
 width:20px;
height:20px;
justify-content:center;
align-items:center;
>span>svg{fill:red;
}
`

export const Wrapper = styled.a`
  position: relative;
background-color:white;
border: 1px solid grey;
border-radius: 16px;
width: 200px;
height: max-content;
padding: 0px;
margin:0;
text-decoration:none;
>img{
position: relative; 
 z-index: 1;
border-top-left-radius: 16px;
border-top-right-radius: 16px;
max-width: 200px;
height:200px;
}
`

export const StyledText = styled.h4`
color: grey;
margin-top: 8px;
margin:0;
`
export const StyledSP = styled.h3`
color:black;
margin:0;`

export const StyledTitle = styled.h6`
color: grey;
width:100%;
margin:0;
`
export const Tags = styled.div`
display:flex;
margin: 4px;
gap:4px;`;

export const StyledTag = styled.div`
border-radius:4px;
color:indigo;
width:max-content;
background-color:pink;
font:solid;

padding: 4px;
font-size:10px;
font-weight:600;
`
export const StyledDiv = styled.div`
display:flex;
margin: 4px 0px;
margin-top: 0;
`
export const StyledDivider = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
margin:8px 0px;`

export const StyledQuote = styled.h6`
border:1px solid green;
padding:4px;
margin:0;
border-radius:10px;
color:green;`

