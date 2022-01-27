import Layout from "@/components/public/layout/Layout";
import Slider from "@/components/public/home/Slider";
import SliderCategory from "@/components/public/home/SliderCategory";
import SliderProduct from "@/components/public/home/SliderProduct";
import InfoHome from "@/components/public/home/InfoHome";
import { getAllCategories, getNewestProducts } from "helpers/api-util";


export default function Home({ categories, newestProducts }) {

  return (
    <>
      <Layout>
        <Slider />
        <InfoHome />
        <SliderCategory categories={categories} />
        <SliderProduct newestProducts={newestProducts} />
      </Layout>
    </>
  )
}


export async function getStaticProps() {
  const categories = await getAllCategories()
  const newestProducts = await getNewestProducts()
  return {
    props: {
      categories,
      newestProducts
    },
    revalidate: 10
  }
}