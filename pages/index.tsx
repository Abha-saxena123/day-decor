import { Banners } from "@/components/landing-page/banners";
import { BestSellingProductList } from "@/components/landing-page/best-selling-product-list";
import { OvalCardList } from "@/components/landing-page/catagory-list";
import styled from "styled-components";

const LandingPageWrapper = styled.div`
display:flex;
flex-direction:column;
gap:32px;
align-items:left;
`

export default function Home() {
  return (
    <LandingPageWrapper>
      <Banners />
      <OvalCardList sectionTitle="Popular Categories" dividerText="Shop By Categories" id={"categories"} filters={{ "filters[tags][tagName][$in]": "Popular Category" }} />
      <BestSellingProductList />
      <OvalCardList sectionTitle="We Are Available at" dividerText="Shop By Places" clickable={false} id={"service-available-ats"} />
    </LandingPageWrapper>
  )
}
