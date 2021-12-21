import { Facebook, Instagram, Twitter, WhatsApp } from '@material-ui/icons';
import styled from 'styled-components';
import Link from "next/link";

const Container = styled.div`
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d3d3d3;

    @media (max-width: 768px){
        display: none;
    }
`

const Social = styled.div`  
    align-items: center;  
    display: flex;
`
const Media = styled.div`
    margin-top: 5px;
    padding: 0px 15px;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover{
        transform: scale(1.1);
    }

`

const ContainerLogSign = styled.div`
    align-items: center;
    display: flex;
`
const LoginItem = styled.div`
    display: inline-block;
    text-transform: uppercase;
    padding: .5rem 1.3rem;
    font-size: .8rem;
    background-color: ${props => props.bg};
    color: ${props => props.color};
    border: 2px solid #303030;
    border-radius: 2rem;
    line-height: 1;
    margin: 0.2rem;
    transition: .3s;
    cursor: pointer;
    font-weight: bold;

    &:hover{
        background-color: ${props => props.color};
        color: ${props => props.bg};
    }
`

const TopNav = () => {

    return (
        <Container>
            <Social>
                <Media>
                    <WhatsApp />
                </Media>
                <Media>
                    <Instagram />
                </Media>
                <Media>
                    <Facebook />
                </Media>
                <Media>
                    <Twitter />
                </Media>
            </Social>
            <ContainerLogSign>
                <Link href='/auth/register'>
                    <LoginItem color="#303030" bg="#f5f5f5">
                        Sing Up
                    </LoginItem>
                </Link>
                <Link href='/auth/login'>
                    <LoginItem color="#f5f5f5" bg="#303030">
                        Log In
                    </LoginItem>
                </Link>
            </ContainerLogSign>
        </Container>
    )
}

export default TopNav

