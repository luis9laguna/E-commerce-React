import { WhatsApp } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.a`
    width: 3rem;
    height: 3rem;
    position: fixed;
    bottom: 5%;
    right: 0;
    z-index: 99999;
    border-radius: 50%;
    color: white;
    display: flex;
    background-color: #4FCE5D;
    align-items: center;
    justify-content: center;
    margin-right: 1.3rem;
    cursor: pointer;
    transition: all .5s ease-in-out;
    &:hover{
        transform: scale(1.15);
    }
`


const Whatsapp = () => {
    return (
        <Container>
            <a><WhatsApp style={{ margin: 'auto' }} /></a>

        </Container>
    )
}

export default Whatsapp