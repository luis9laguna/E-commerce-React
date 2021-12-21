import { Send } from "@material-ui/icons";
import styled from 'styled-components';

const Container = styled.div`
    height: 30vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #303030;
`
const Title = styled.h2`
    font-size: 4.5rem;
    margin: 1.3rem;

    @media (max-width: 450px){
        font-size: 3.5rem;
    }
`
const Description = styled.div`
    font-size: 1.6rem;
    margin-bottom: 1.3rem;
    text-align: center;

    @media (max-width: 450px){
        font-size: 1rem;
    }
`
const InputContainer = styled.div`
    width: 30%;
    height: 2.5rem;
    background-color: white;
    display: flex;
    justify-content: center;
    border: 1px solid #303030;

    @media (max-width: 768px){
        width: 100%;
    }
    
`
const Input = styled.input`
    border: none;
    flex: 7;
    padding-left: 1.3rem;
    background-color: #f5f5f5;
`
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: #303030;
    color: white;
`

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get updates and offers from your favorite products.</Description>
            <InputContainer>
                <Input placeholder="Your Email" />
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter