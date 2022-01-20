import Layout from "@/components/public/layout/Layout";
import Slider from "@/components/public/home/Slider";
import SliderCategory from "@/components/public/home/SliderCategory";
import SliderProduct from "@/components/public/home/SliderProduct";
import InfoHome from "@/components/public/home/InfoHome";


export default function Home() {

  return (
    <div>
      <Layout>
        <Slider />
        <InfoHome />
        <SliderCategory />
        <SliderProduct />
      </Layout>
    </div>
  )
}
