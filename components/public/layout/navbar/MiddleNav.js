import { useState } from 'react';
import { Badge } from '@material-ui/core';
import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import DownNav from './DownNav';
import Link from 'next/link';

const Container = styled.div`
    padding: 0 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 650px){
        padding: 0px;
        display: grid;
        grid-template-areas:
        "logo logo logo logo cartfav menu"
        "search search search search search search"
    }
`

const Logo = styled.h1`
    font-weight: bold;
    padding-right: 1.5rem;
    padding-left: 1rem;
    flex: 1;

    @media (max-width: 650px){
        grid-area: logo;
        padding-right: 0;

    }
`

const SearchContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 40rem;
    height: 3rem;
    border: 4px solid #303030;
    padding: 0px 10px;
    border-radius: 50px;
    background-color: white;

    @media (max-width: 650px){
        grid-area: search;
        width: 100%;
        margin-bottom: 1rem;
    }
`

const Input = styled.input`
    border: none; 
    height: 100%;
    width: 100%;
    padding: 0px 5px;
    border-radius: 50px;
    font-size: 1rem;
    color: #303030;
    font-weight: 500;

    &:focus{
        outline: none;
    }
`

const CartFavContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media (max-width: 650px){
        grid-area: cartfav;
        
    }
`

const CartFav = styled.div`
    font-size: 14px;
    align-items: center;
    cursor: pointer;
    margin: 0 1rem;

    transition: all .3s ease-in-out;

    &:hover{
        transform: scale(1.1);
    }

    @media (max-width: 650px){
        margin: 0 .5rem;
    }
`


const ContainerHamburger = styled.div`
    flex: 1;
    display: none;
    align-items: center;
    justify-content: flex-end;
    margin-left: 2rem;
    position: relative;
    z-index: 20;
    @media (max-width: 768px){
        display: flex;
    }

    @media (max-width: 650px){
        grid-area: menu;
        margin: 0;

    }
`


const Hamburger = styled.div`

    div{
        width: 2.2rem;
        height: 0.25rem;
        background-color: ${({ open }) => open ? '#ccc' : '#333'};
        border-radius: 10px;
        margin: 0.35rem;
        transform-origin: 1px;
        transition: all .3s ease-in-out;

        &:nth-of-type(1) {
            transform: ${({ open }) => open ? 'rotate(38deg)' : 'rotate(0deg)'};
        }
        &:nth-of-type(2) {
            transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({ open }) => open ? '0' : '1'};
        }
        &:nth-of-type(3) {
            transform: ${({ open }) => open ? 'rotate(-38deg)' : 'rotate(0deg)'};
        }
    }
    
`

const MiddleNav = () => {

    const [open, setOpen] = useState(false);


    return (
        <div>
            <Container>
                <Logo>
                    <Link href='/'>
                        SHOOP.
                    </Link>
                </Logo>
                <SearchContainer>
                    <Input placeholder="Search" />
                    <Search style={{ color: "black", fontSize: "16px" }} />
                </SearchContainer>
                <CartFavContainer>
                    <CartFav>
                        <Link href='/wishList'>
                            <FavoriteBorderOutlined />
                        </Link>
                    </CartFav>
                    <CartFav>
                        <Badge badgeContent={4} color="secondary">
                            <Link href='/cart'>
                                <ShoppingCartOutlined />
                            </Link>
                        </Badge>
                    </CartFav>
                </CartFavContainer>
                <ContainerHamburger>
                    <Hamburger open={open} onClick={() => setOpen(!open)}>
                        <div />
                        <div />
                        <div />
                    </Hamburger>
                </ContainerHamburger>
            </Container>
            <DownNav open={open} />
        </div>
    )
}

export default MiddleNav

