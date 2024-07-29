
import { Badge, Button, Typography, Divider, InputNumber } from "antd";
import styled from "styled-components";
import { getTruncatedText, toCurrency } from "../common/utils/helpers/formatting.helpers";
import { StarOutlined, StarFilled, HeartFilled, ShareAltOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { useState } from "react";

export interface ProductCardProps {
    title: string;
    rating?: number;
    star?: number;
    sp?: number;
    mp?: number;
    discount?: number;
    productInfo?: any;
    stockQuantity: number;
    category?: string;
    productId: string
}
const CounterContainer = styled.div`
  display: flex;

flex-grow:1;
 justify-content:end;
  align-items: center;
  gap: 10px;
`;

export const ProductCard: React.FC<ProductCardProps> = ({
    title,
    rating = 123,
    star = 4.3,
    sp,
    mp,
    discount,
    productInfo,
    stockQuantity,
    productId,
}) => {
    const [quantity, setQuantity] = useState<number | null>(1);

    const handleQuantityChange = (value: number | null) => {
        setQuantity(value);
        // onChange(value);
    };
    const handleAddToCart = async () => {
        try {
            console.log("s")
            // const res = await fetch('/api/cart/add', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ userId, productId, quantity }),
            // });
            // const data = await res.json();
            // console.log('Added to cart:', data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    return (
        <InfoWrapper>
            <StyledTitle>{title}</StyledTitle>
            <RatingContainer>
                <StarRating rating={star || 0} />
                <h5>({star})</h5>
                |
                <h3>{rating} reviews</h3>
            </RatingContainer>
            <Divider style={{ margin: "8px 0" }} />
            <Typography.Title level={4} style={{ margin: 0, display: "flex" }}>
                Availibility : {stockQuantity < 1 ?
                    <Typography.Title level={4} italic style={{ margin: 0 }} type="danger">
                        Out of Stock
                    </Typography.Title> :
                    <Typography.Title level={4} italic style={{ margin: 0 }} type="success">
                        In Stock
                    </Typography.Title>}
            </Typography.Title>
            <div style={{ display: "flex", gap: "8px" }}>
                <Typography.Title level={1} style={{ margin: 0, fontSize: "48px", }}>
                    {toCurrency(sp)}
                </Typography.Title>

                <Typography.Title level={4} style={{ margin: 0, fontWeight: "normal", }} delete>{toCurrency(mp)}</Typography.Title>

                <Badge
                    count={`${discount}% off`}
                    style={{ backgroundColor: '#000', alignSelf: "flex-start", color: "#fff", minWidth: "70px", borderRadius: "6px" }}
                />
                <CounterContainer>
                    <Button
                        onClick={() => handleQuantityChange(quantity && (quantity - 1))}
                        disabled={!!(quantity && (quantity <= 1))}
                    >
                        -
                    </Button>
                    <InputNumber
                        min={1}
                        value={quantity}
                        onChange={handleQuantityChange}
                        style={{ width: '50px' }}
                    />
                    <Button onClick={() => handleQuantityChange(quantity && (quantity + 1))}>
                        +
                    </Button>
                </CounterContainer>
            </div>

            <Divider style={{ margin: "8px 0" }} />
            <Button type="primary" icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />} style={{
                width: "100%", fontSize: "18px", fontWeight: "bold", marginBottom: "8px", alignItems: "center", display: "flex",
                justifyContent: "center",
                height: "40px", borderRadius: "10px"
            }} onClick={handleAddToCart}>Add To Cart</Button>
            <StyledButtons>
                <Button icon={<HeartFilled />} style={{ color: "#f2266b", fontWeight: "bold", fontSize: "18px", border: "1px solid #f2266b", padding: 0, height: "40px", borderRadius: "10px" }} > Wishlist</Button>
                <Button icon={<ShareAltOutlined />} style={{ color: "#f2266b", fontWeight: "bold", fontSize: "18px", border: "1px solid #f2266b", padding: 0, height: "40px", borderRadius: "10px" }} > Share</Button>
            </StyledButtons>
            <Divider style={{ display: "flex" }} />
            <div>
                {productInfo && <ReactMarkdown remarkPlugins={[gfm]} children={getTruncatedText(productInfo, 210).smallText} />}
                <Button type="link">read more</Button>
            </div>
        </InfoWrapper >
    );
};


const Styledh5 = styled.h5`
color:grey;
`
const StyledTitle = styled.h1`
margin:0;
margin-bottom:4px;
`
const RatingContainer = styled.div`
 display: flex; align-items: center; gap: 8px;
h3,h5 {
margin:0}
`

const StyledButtons = styled.div`
color:#f2266b;
gap:16px;
background-color:white;
display:flex;
>button{
flex:1}
`

const InfoWrapper = styled.div`
width:46%;
display:flex;
flex-direction:column;
`


const StarRating = ({ rating }: any) => {
    const stars = [];

    // Calculate the number of filled stars
    const filledStars = Math.floor(rating);

    // Calculate the decimal part to determine the fill of the next star
    const decimalPart = rating - filledStars;

    // Fill stars based on rating
    for (let i = 1; i <= 5; i++) {
        if (i <= filledStars) {
            stars.push(<StarWrapper key={i} style={{ color: "#FFD700" }}><StarFilled /></StarWrapper>);
        } else if (i === filledStars + 1 && decimalPart > 0) {
            stars.push(<PartialStarWrapper key={i} fillPercentage={decimalPart * 100} style={{ color: "#FFD700" }}><StarFilled /></PartialStarWrapper>);
        } else {
            stars.push(<StarWrapper style={{ color: "#FFD700" }} key={i}><StarOutlined /></StarWrapper>);
        }
    }

    return <StarContainer>{stars}</StarContainer>;
};

const StarContainer = styled.div`
  display: flex;
`;

const StarWrapper = styled.div`
  padding: 2px; /* Adjust padding as needed */
`;

const PartialStarWrapper = styled.div<{ fillPercentage: number }>`
  padding: 2px; /* Adjust padding as needed */
  mask-image: linear-gradient(to right, white ${props => props.fillPercentage}%, transparent ${props => props.fillPercentage}%);
`;
