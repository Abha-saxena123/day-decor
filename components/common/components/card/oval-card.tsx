

import { Card, Tooltip } from "antd";
import { Fragment, ReactNode } from "react";
import styled from "styled-components";
import { getTruncatedText } from "../../utils/helpers/formatting.helpers";

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
    const { smallText, fullText, isToolTipNeeded } = getTruncatedText(text, 24); //top right botton left
    return (
        <Wrapper>
            {clickable ?
                (<a href={`${link}`}>
                    <OvalCardWrapper>
                        <img src={image} alt={altText} />
                        <div>
                            <div style={{
                                minWidth: "200px", borderRadius: "50% 50% 0 0", height: "170px", padding: "4px", borderStyle: "dotted dotted none dotted"
                            }} />
                            <div style={{
                                minWidth: "200px", borderRadius: "0 0 50% 50%", height: "170px", padding: "4px", borderStyle: "none dotted dotted dotted"
                            }} />
                        </div>
                    </OvalCardWrapper>
                    {
                        isToolTipNeeded ?
                            <Tooltip title={fullText}>
                                <StyledText>{smallText}</StyledText>
                            </Tooltip>
                            : <StyledText>{text}</StyledText>
                    }

                </a >) :
                <Fragment>
                    <OvalCardWrapper>
                        <img src={image} alt={altText} />
                        <div>
                            <div style={{
                                minWidth: "200px", borderRadius: "50% 50% 0 0", height: "170px", padding: "4px", borderStyle: "dotted dotted none dotted"
                            }} />
                            <div style={{
                                minWidth: "200px", borderRadius: "0 0 50% 50%", height: "170px", padding: "4px", borderStyle: "none dotted dotted dotted"
                            }} />
                        </div>
                    </OvalCardWrapper>
                    {isToolTipNeeded ?
                        <Tooltip title={fullText}>
                            <StyledText>{smallText}</StyledText>
                        </Tooltip>
                        : <StyledText>{text}</StyledText>}
                </Fragment>
            }
        </Wrapper >
    );
};


const OvalCardWrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
>img{
width:190px;
height: 335px;
border-radius:95px;
position:absolute;
}
`


export const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
>a{
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-decoration:none;
color:black
}
`
const StyledText = styled.h3`
text-transform: capitalize;
`

