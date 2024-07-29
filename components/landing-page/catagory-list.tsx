import styled from "styled-components";
import { OvalCard, OvalCardProps } from "../common/components/card/oval-card";
import { Divider } from "antd";
import { useFetch } from "../hooks/use-fetch";
import { OvalCardSkeleton } from "../common/components/skeleton/oval-card-skeleton";

const formateData = (data: any, id?: string) => {
    switch (id) {
        case "categories":
            return data.map(({ attributes }: any) => {
                return {
                    text: attributes.name,
                    link: '/categories/' + attributes.uid,
                    altText: attributes.image?.data?.attributes?.name,
                    image: "http://localhost:1337" + attributes.image?.data?.attributes?.url
                }
            }).splice(0, 4)
        default:
            return [...data.map(({ attributes }: any) => {
                return {
                    text: attributes.place,
                    link: attributes.uid,
                    altText: attributes.image?.data?.attributes?.place,
                    image: "http://localhost:1337" + attributes.image?.data?.attributes?.url
                }
            }).splice(0, 3), {
                text: "Other Cities",
                link: "http://localhost:3000/cities",
                altText: "Other Cities",
                image: "http://localhost:3000" + "/80+Cities.png"
            }]
    }
}

export const OvalCardList: React.FC<{
    sectionTitle?: string;
    dividerText?: string;
    clickable?: boolean;
    id: string;
    filters?: Record<string, string>;
}> = ({
    sectionTitle, dividerText, clickable = true, id, filters
}) => {
        const { data: list, isLoading } = useFetch<OvalCardProps[]>({ id, params: { "populate": "*", ...filters }, cb: formateData });
        return (
            <Wrapper>
                {dividerText && <StyledDivider>{dividerText}</StyledDivider>}
                {sectionTitle && <Styledtext>{sectionTitle}</Styledtext>}
                <CatorgyListWrapper>
                    {isLoading ? Array.from({ length: 4 }).map((_, i) => <OvalCardSkeleton />) : list?.map((catagory: OvalCardProps) => { return <OvalCard {...catagory} clickable={clickable} /> })}
                </CatorgyListWrapper>
            </Wrapper >
        );
    };

const CatorgyListWrapper = styled.div`
align-items: center;
display: flex;
gap:48px;
max-width: 95vw;
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
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`
const Styledtext = styled.h2`
margin-top: 0px;
font-size: 24px;
font-weight: 600;

`

const StyledDivider = styled(Divider)`
min-width:500px ;
font-size: 22px;
font-weight: 600;
width:500px;
margin: 8px;
text-transform: uppercase;
`