import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faGem, faTruck } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 5rem;
    flex-wrap: wrap;
`
const Info1 = styled.div`
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 10rem;
    margin: 2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 2rem;
    transition: all .3s ease-in-out;

    &:hover{
        transform: scale(1.01);
    }
`
const Info2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 10rem;
    margin: 2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 2rem;
    transition: all .3s ease-in-out;

    &:hover{
        transform: scale(1.01);
    }
`
const Info3 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 10rem;
    margin: 2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 2rem;
    transition: all .5s ease-in-out;

    &:hover{
        transform: scale(1.01);
    }
`

const Icon = styled.div`
    flex: 1;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  
`

const Description = styled.div`

    flex: 2;
`

const Info = () => {

    return (
        <Container>
            <Info1>
                <Icon >
                    <FontAwesomeIcon icon={faGem} />
                </Icon>
                <Description>
                    We have one of the best quality on the market, you can rest assure that you will received a HQ Product.
                </Description>
            </Info1>
            <Info2>
                <Icon>
                    <FontAwesomeIcon icon={faTruck} />
                </Icon>
                <Description>
                    Shippings to all the country, we secured your order.
                </Description>
            </Info2>
            <Info3>
                <Icon>
                    <FontAwesomeIcon icon={faCreditCard} />
                </Icon>
                <Description>
                    You can pay with CreditCard and DebitCart, the most confiable way of buying.
                </Description>
            </Info3>

        </Container>
    )
}

export default Info