import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    margin: 0.5rem;
    position: relative;
    border-radius: 20%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: all .2s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.01);
        box-shadow: inset 0 0 50px red;
    }
`
const Image = styled.img`
    width: 35rem;
    height: 28rem;
    object-fit: cover;
    border-radius: 20%;
    opacity: 0.7;

    @media (max-width: 580px){
        font-size: 1rem;
        width: 23rem;
        height: 18rem;
    }

    @media (max-width: 450px){
        font-size: 1rem;
        width: 18rem;
        height: 15rem;
    }

`
const Title = styled.h2`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f5f5f5;
    font-size: 2rem;
    
`
const CategoryItem = ({ item }) => {

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
            <Image src={item.img} />
            <Title>{title}</Title>
        </Container>
    )
}

export default CategoryItem