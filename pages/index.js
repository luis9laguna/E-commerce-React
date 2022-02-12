import Layout from "@/components/public/layout/Layout";
import Slider from "@/components/public/home/Slider";
import SliderCategory from "@/components/public/home/SliderCategory";
import SliderProduct from "@/components/public/ui/SliderProduct";
import InfoHome from "@/components/public/home/InfoHome";
import { getAllCategories, getNewestProducts, getProductsWithMoreLikes } from "helpers/api-util";


export default function Home({ categories, newestProducts, likesProducts }) {

  return (
    <>
      <Layout>
        <Slider />
        <InfoHome />
        <SliderCategory categories={categories} />
        <SliderProduct products={newestProducts} description='Take a look to our new Products' icon='news' />
        <SliderProduct products={likesProducts} description='Check The Favorite Products of our users' icon='favs' />
      </Layout>
    </>
  )
}


export async function getStaticProps() {
  const categories = await getAllCategories() || []
  const newestProducts = await getNewestProducts() || []
  const likesProducts = await getProductsWithMoreLikes() || []
  return {
    props: {
      categories,
      newestProducts,
      likesProducts
    },
    revalidate: 10
  }
}