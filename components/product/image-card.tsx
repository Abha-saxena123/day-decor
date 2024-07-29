
import { Carousel, Divider, Menu } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import { useRef, useState } from 'react';
export interface ProductCardImageProps {
    productImage: { src: string, alt: string };
    otherImages: { src: string, alt: string }[]
}

const CarouselWrapper = styled.div`
    display: flex;
    max-width: 500px;
    gap: 16px;
    flex-direction: column;
     >div>div{
          justify-content:center;
        display:flex;
         >button {
         color:#f2266b !important;
       }
     >button::after {
    border-inline-width: 5px 0 !important;
    border-block-width: 2px 0 !important;}
      >div>div >div{
         justify-content: center;
         display: flex !important;
        }

}

`;

// const generateMenuItems = (productImages: any) => {
//     return productImages?.map((img, i) =>
//     ({
//         key: `${img.alt || img.src}_${i}`, label: (<Image
//             width={100}
//             height={100}
//             alt={img.src}
//             src={img.src}
//             key={i}
//         />)
//     })

//     )
// }
export const ProductCardImage: React.FC<ProductCardImageProps> = ({
    productImage, otherImages
}) => {
    const carouselRef = useRef(null);
    const [selectedSlide, setSelectedSlide] = useState(0)
    const goToSlide = (currSlide: number) => {
        (carouselRef?.current as any)?.goTo(currSlide, false);
        setSelectedSlide(currSlide)
    }
    const productImages = [productImage, ...otherImages];
    return (
        <CarouselWrapper>
            <Carousel arrows ref={carouselRef}>
                {productImages?.map((img, i) =>
                    <div key={i}>
                        <Image
                            width={370}
                            height={400}
                            alt={img.src}
                            src={img.src}

                        />
                    </div>
                )}
            </Carousel>
            <SmallImageWrapper>
                {productImages?.map((img, i) =>
                    <StyledDiv selected={selectedSlide === i} key={i} onClick={() => goToSlide(i)}>
                        <Image
                            width={110}
                            height={110}
                            alt={img.src}
                            src={img.src}
                        />
                    </StyledDiv>)
                }
            </SmallImageWrapper>
        </CarouselWrapper>
    );
};

const SmallImageWrapper = styled.div`
    display: flex;
    margin-top: 10px;
    gap:20px;
    max-width:370px;
    margin-left:64px;
    overflow-x:scroll;
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
>div>img{
border-radius:10px;
}
`

const StyledDiv = styled.div<{ selected?: boolean }>`
padding-bottom:4px;
${({ selected }) => selected && `border-bottom: 2px solid #f2266b;`}
`