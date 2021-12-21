import { Facebook, Instagram, MailOutline, Map, Phone, Twitter, WhatsApp } from '@material-ui/icons';
import styled from 'styled-components';
import Link from "next/link";
import Newsletter from './elements/Newsletter';
import Whatsapp from './elements/Whatsapp';


const Container = styled.div`
    display: flex;
    background-color: #303030;
    color: #f5f5f5;
    @media (max-width: 768px){
        flex-direction: column;
    }
    
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.3rem;
    width: 25rem;

    @media (max-width: 768px){
        width: 100%;
    }
`
const Logo = styled.h1`
    font-size: 2rem;
`
const Description = styled.p`
    margin-bottom: 1.3rem;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    color: white;
    display: flex;
    background-color: #${props => props.color};
    align-items: center;
    justify-content: center;
    margin-right: 1.3rem;
    cursor: pointer;
    transition: all .5s ease-in-out;
    &:hover{
        transform: scale(1.15);
    }
    
`

const Center = styled.div`
    flex: 1;
    text-align: center;
    padding: 1.3rem;
    width: 25rem;

    @media (max-width: 768px){
        display: none;
    }
`

const Title = styled.h2`
    margin-bottom: 1.7rem;
    font-size: 2rem;
`

const List = styled.ul`
    margin: 0px;
    padding: 0px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 0.8rem;
    cursor: pointer;
    transition: all .5s ease-in-out;
    &:hover{
        transform: scale(1.15);
    }
`

const Right = styled.div`
    flex: 1;
    text-align: center;
    width: 25rem;

    @media (max-width: 768px){
        width: 100%;
        background-color: #f5f5f5;
        color: #303030;
    }
`

const ContactItem = styled.div`
    margin-bottom: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    return (
        <>
            <Newsletter />
            <Container>
                <Left>
                    <Logo>SHOOP.</Logo>
                    <Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Description>
                    <SocialContainer>
                        <SocialIcon color="3B5999">
                            <Facebook style={{ margin: 'auto' }} />
                        </SocialIcon>
                        <SocialIcon color="55ACEE">
                            <Twitter style={{ margin: 'auto' }} />
                        </SocialIcon>
                        <SocialIcon color="4FCE5D">
                            <WhatsApp style={{ margin: 'auto' }} />
                        </SocialIcon>
                        <SocialIcon color="E4405F">
                            <Instagram style={{ margin: 'auto' }} />
                        </SocialIcon>
                    </SocialContainer>
                </Left>
                <Center>
                    <Title>Useful Links</Title>
                    <List>
                        <ListItem>
                            <Link href='/'>
                                Home
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='/allProducts'>
                                All Products
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='/aboutUs'>
                                About Us
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='/contactUs'>
                                Contact Us
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='/wishList'>
                                WishList
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='/cart'>
                                Cart
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='/auth/register'>
                                Register
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='/auth/login'>
                                Log In
                            </Link>
                        </ListItem>
                    </List>
                </Center>
                <Right>

                    <Title>Contact</Title>
                    <ContactItem>
                        <Map style={{ marginRight: '10px' }} /> 678, pathser, south bosttom 54615
                    </ContactItem>
                    <ContactItem>
                        <Phone style={{ marginRight: '10px' }} />  +1 234 56 78
                    </ContactItem>
                    <ContactItem>
                        <MailOutline style={{ marginRight: '10px' }} /> contact@shoop.info
                    </ContactItem>
                    <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
                </Right>
                <Whatsapp />
            </Container>
        </>
    )
}

export default Footer