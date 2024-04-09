import styled from "styled-components";
import { OvalCard, OvalCardProps } from "../common/components/card/oval-card";
import { Divider } from "antd";


export const OvalCardList: React.FC<{
    list: OvalCardProps[]; sectionTitle?: string;
    dividerText?: string;
    clickable?: boolean
}> = ({
    list, sectionTitle, dividerText, clickable = true
}) => {
        return (
            <Wrapper>
                {dividerText && <StyledDivider>{dividerText}</StyledDivider>}
                {sectionTitle && <Styledtext>{sectionTitle}</Styledtext>}
                <CatorgyListWrapper>
                    {list.map((catagory: OvalCardProps) => { return <OvalCard {...catagory} clickable={clickable} link={"name"} /> })}
                </CatorgyListWrapper>
            </Wrapper >
        );
    };

const CatorgyListWrapper = styled.div`
align-items: center;
display: flex;
gap:8px;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Styledtext = styled.h2`
margin-top: 0px;`

const StyledDivider = styled(Divider)`
min-width:500px ;
width:500px;
margin: 8px;
`