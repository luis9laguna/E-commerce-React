import Layout from "../components/public/layout/Layout";
import Slider from "../components/public/home/Slider";
import Categories from "../components/public/home/categories";
import Products from "../components/public/home/products";
import Info from "../components/public/home/info";


export default function Home() {
  return (
    <div>
      <Layout>
        <Slider />
        <Info />
        <Categories />
        <Products />
      </Layout>
    </div>
  )
}
