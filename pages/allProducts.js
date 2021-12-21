import styled from "styled-components";
import Layout from "../components/public/layout/Layout";
import { popularProducts1 } from "../utils/data";
import ProductItem from "../components/public/home/ProductItem";


const Container = styled.div``


const Title = styled.h1`
  margin: 2rem;
  text-align: center;
  font-size: 3rem;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 1.5rem;
`
const Products = styled.div`
  display: flex;
  padding: 1.3rem;
  justify-content: space-between;
  flex-wrap: wrap;
`

const FilterText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 1.5rem;
`;
const Select = styled.select`
  padding: 0.8rem;
  margin-right: 1.5rem;
`
const Option = styled.option`
`

export default function AllProducts() {
  return (
    <>
      <Layout>
        <Container>
          <Title>All Products</Title>
          <FilterContainer>
            <Filter>
              <FilterText>Filter Products:</FilterText>
              <Select>
                <Option disabled selected>Color</Option>
                <Option>White</Option>
                <Option>Black</Option>
                <Option>Red</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>
              </Select>
              <Select>
                <Option disabled selected>Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                <Option>XXL</Option>
              </Select>
            </Filter>
            <Filter>
              <FilterText>Sort Products:</FilterText>
              <Select>
                <Option selected>Newest</Option>
                <Option>Price (asc)</Option>
                <Option>Price (desc)</Option>
              </Select>
            </Filter>
          </FilterContainer>
          <Products>
            {popularProducts1.map(item => (
              <ProductItem key={item.id} item={item} />
            ))}
          </Products>
        </Container>
      </Layout>
    </>
  )
}