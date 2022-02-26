import Layout from "@/components/public/layout/Layout";
import Slider from "@/components/public/home/Slider";
import SliderCategory from "@/components/public/home/SliderCategory";
import SliderProduct from "@/components/public/ui/SliderProduct";
import InfoHome from "@/components/public/home/InfoHome";

const Home = ({ categories, newestProducts, likesProducts }) => {

  return (
    <Layout>
      <Slider />
      <InfoHome />
      <SliderCategory categories={categories} />
      <SliderProduct products={newestProducts} description='Take a look to our new Products' icon='news' />
      <SliderProduct products={likesProducts} description='Check The Favorite Products of our users' icon='favs' />
    </Layout>
  )
}

export async function getStaticProps() {

  const respCategories = await fetch(`${process.env.url}/category`)
  const categories = await respCategories.json()

  const respNewestProducts = await fetch(`${process.env.url}/product/newest`)
  const newestProducts = await respNewestProducts.json()

  const respLikesProducts = await fetch(`${process.env.url}/like/products`)
  const likesProducts = await respLikesProducts.json()

  return {
    props: {
      categories: categories.categories,
      newestProducts: newestProducts.products,
      likesProducts: likesProducts.products
    },
    revalidate: 10
  }
}

export default Home
