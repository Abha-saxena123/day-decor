

import { Card } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";

export interface OvalCardProps {
    text: any;
    image: string;
    altText?: string;
    clickable?: boolean;
    link?: string
}

export const OvalCard: React.FC<OvalCardProps> = ({
    text, image, altText = "Paris", clickable, link
}) => {
    return (
        <>
            {clickable ? (<a href={`/${link}`}><Wrapper>
                <OvalCardWrapper>
                    <img src={image} alt={altText} />
                </OvalCardWrapper>
                <Styledtext>{text}</Styledtext>
            </Wrapper></a>) : <Wrapper>
                <OvalCardWrapper>
                    <img src={image} alt={altText} />
                </OvalCardWrapper>
                <Styledtext>{text}</Styledtext>
            </Wrapper>}
        </>
    );
};


const OvalCardWrapper = styled.div`
border-style: dotted;
padding: 6px;
border-radius: 50%;
max-width: 150px;
max-height:270px;
>img{
border-radius: 50%;
max-width: 150px;
height:270px;
}
`


const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Styledtext = styled.h3`
text-transform: capitalize;
`

