import { OvalCard } from "@/components/common/components/card/oval-card";
import { ProductDescriptionCard } from "@/components/common/components/card/product-description-card";
import { OvalCardList } from "@/components/landing-page/catagory-list";
import { ProductCard } from "@/components/product/product-card";


export default function Home() {
  return (
    <div>
      <ProductDescriptionCard
        rating={318}
        star={4.5}
        sp={995}
        mp={1375}
        image={"https://www.w3schools.com/css/paris.jpg"}
        discount={28}
        title="Magic Cuppa"
        tags={[{ icon: <span>&#128205;</span>, name: "Personalized" }, { icon: <span>&#128205;</span>, name: "Same Day Delivery" }]}
      />
      {/* <OvalCardList list={d} sectionTitle="Popular Categories" dividerText="Shop By Category" />
      <OvalCardList list={d} sectionTitle="We Are Available at" dividerText="Shop By Places" clickable={false} /> */}
    </div>
  )
}

const d = [
  {
    image: "https://www.w3schools.com/css/paris.jpg",
    text: "cake"
  },
  {
    image: "https://www.w3schools.com/css/img_forest.jpg",
    text: "forest"
  },
  {
    image: "https://www.w3schools.com/css/paris.jpg",
    text: "cake"
  },
  {
    image: "https://www.w3schools.com/css/img_forest.jpg",
    text: "forest"
  }]