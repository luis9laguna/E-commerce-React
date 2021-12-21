import styled from "styled-components";
import { popularProducts1, popularProducts2 } from "../../../utils/data";
import ProductItem from "./ProductItem";
import ScrollContainer from 'react-indiana-drag-scroll'
import { Favorite, NewReleases } from "@material-ui/icons";

const Information = styled.h2`
    margin: auto;
    display: flex;
    justify-content: flex-end;
    font-size: 1.8rem;
    color: #303030;
    margin-top: 3rem;

    @media (max-width: 768px){
        font-size: 1.3rem;
    }
    
`

const Products = () => {

    return (
        <>
            <Information>
                Check The Favorite Products of our users <Favorite />
            </Information>

            <ScrollContainer vertical="false" className="scroll-container">
                {popularProducts1.map(item => (
                    <ProductItem key={item.id} item={item} />
                ))}
            </ScrollContainer>

            <Information>
                Take a look to our new Products <NewReleases />
            </Information>

            <ScrollContainer className="scroll-container">
                {popularProducts2.map(item => (
                    <ProductItem key={item.id} item={item} />
                ))}
            </ScrollContainer>

        </>
    )
}

export default Products