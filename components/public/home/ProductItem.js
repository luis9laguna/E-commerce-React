import { FavoriteBorderOutlined, SearchOutlined, ShoppingBasketOutlined } from "@material-ui/icons";
import styled from "styled-components";


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.5s;   
`

const Container = styled.div`
    
    flex:1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    background-color: #f5fbfd;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: all .2s ease-in-out;
    
    &:hover {
        transform: scale(1.01);
    }
    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #f5f5f5;
    position: absolute;
`
const Image = styled.img`
    height: 75%;
    object-fit: cover;
    z-index: 2;
`

const Title = styled.h2`
    color: #f5f5f5;
    text-align: center;
`
const Price = styled.div`
    color: #f5f5f5;
    font-weight: bold;
    font-size: 2rem;

`
const AllIcons = styled.div`
    display: flex;
    align-items: center;

 `

const Icon = styled.div`

    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-color:  #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.7rem;
    transition: all .5s ease-in-out;
    
    &:hover{
        background-color: red;
        transform: scale(1.1);
    }
`

const ProductItem = ({ item }) => {

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const title = titleCase(item.title);

    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Title>{title}</Title>
                <Price>${item.price}</Price>
                <AllIcons>
                    <Icon>
                        <ShoppingBasketOutlined style={{ margin: 'auto' }} />
                    </Icon>
                    <Icon>
                        <SearchOutlined style={{ margin: 'auto' }} />
                    </Icon>
                    <Icon>
                        <FavoriteBorderOutlined style={{ margin: 'auto' }} />
                    </Icon>
                </AllIcons>
            </Info>
        </Container>
    )
}

export default ProductItem