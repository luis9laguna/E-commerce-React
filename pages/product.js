import Layout from "../components/public/layout/Layout";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";

const Containter = styled.div`
    padding: 3rem;
    display: flex; 
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 4rem;
`
const Title = styled.h1`
    font-weight: 200;
`
const Description = styled.p`
    margin: 1.5rem 0;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 3rem;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 1.5rem;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0 .4rem;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 1rem;
    padding: 0.4rem;
`
const FilterSizeOption = styled.option`

`
const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 2rem;
    height: 2rem;
    border-radius: .6rem;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 .3rem;
`
const Button = styled.button`
    padding: 1rem;
    border: 1px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        font-weight: 100;
    }
`


export default function Product() {
    return (
        <div>
            <Layout>
                <Containter>
                    <ImgContainer>
                        <Image src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>Denim Jumpsuit</Title>
                        <Description> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Description>
                        <Price>$ 20</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterTitle>Color</FilterTitle>
                                <FilterColor color="black"></FilterColor>
                                <FilterColor color="darkblue"></FilterColor>
                                <FilterColor color="gray"></FilterColor>
                            </Filter>
                            <Filter>
                                <FilterTitle>Size</FilterTitle>
                                <FilterSize>
                                    <FilterSizeOption>XS</FilterSizeOption>
                                    <FilterSizeOption>S</FilterSizeOption>
                                    <FilterSizeOption>M</FilterSizeOption>
                                    <FilterSizeOption>L</FilterSizeOption>
                                    <FilterSizeOption>XL</FilterSizeOption>
                                    <FilterSizeOption>XXL</FilterSizeOption>
                                </FilterSize>
                            </Filter>
                        </FilterContainer>
                        <AddContainer>
                            <AmountContainer>
                                <Remove />
                                <Amount>1</Amount>
                                <Add />
                            </AmountContainer>
                            <Button>ADD TO CART</Button>
                        </AddContainer>
                    </InfoContainer>
                </Containter>
            </Layout>
        </div>
    )
}
