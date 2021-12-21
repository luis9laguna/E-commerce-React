import { ArrowDropDown } from '@material-ui/icons';
import styled from 'styled-components';
import Link from "next/link";


const Container = styled.div`
    border-top: 1px solid #d3d3d3;
    padding: 0px 40px;
    padding-bottom: 10px; 
    display: flex;
    justify-content: space-around;
    background-color: #303030;
    color: #f5f5f5;

    @media (max-width: 768px){
        flex-flow: column;
        justify-content: normal;
        position: fixed;
        transform: ${({ open }) => open ? 'translateX(0)' : 'translate(100%)'};
        top: 0;
        right: 0;
        height: 100vh;
        width: 50%;
        transition: transform 0.3s ease-in-out;
        padding: 50px 0 0 0;
        
    }

    @media (max-width: 450px){
        width: 70%;
    }

    
`
const Options = styled.div`

    font-size: 1.3rem;
    padding: 1rem 0.3rem .4rem 0;
    font-weight: bold;
    @media (max-width: 768px){
        border-bottom: 1px solid white;
        width: 100%;
        padding: 0;
    }


    
`
const Pages = styled.a`
    font-size: 1.3rem;
    cursor: pointer;
    @media (max-width: 500px){
        
    }

   
    &::after {
        content: "";
        background-color: #f5f5f5;
        height: 3px;
        width: 0%;
        display: block;
        left: 0;
        bottom: -10px;
        position: static;
        transition: 0.3s;
    }
    
    @media (min-width: 768px){
    &:hover::after{
        width: 100%;
    }
}

    @media (max-width: 768px){
        display: flex;
        text-aling: center;
        padding: 3rem 1rem;
    }

`

const Category = styled.div`
    display: flex;
`

const DropDown = styled.div`
    position: absolute;
    margin-top: 0.8rem;
    pointer-events: none;
    
`
const LinkDropDown = styled.li`
    list-style: none;
    transform: translateY(10px);
    opacity: 0;
    transition: .5s;

    ${Category}:hover & {
       opacity: 1;
       transform: translateY(-10px);
       pointer-events: auto;
    }

  
`

const CatePage = styled.div`
    display: flex;
    padding: 0.7rem 2rem;
    background-color: #f5f5f5;
    color: black;
    font-size: 1.2rem;
    align-items: center;
    justify-content: center;
    list-style: none;
    border-bottom: 1px solid #303030;
    transition: all .3s ease-in-out;

    &:hover{
        color: #f5f5f5;
        background-color: #303030;
    }

    ${DropDown}:hover & {
       opacity: 1;
    }
    
`
const Arrow = styled.div`
    position: absolute;
    width: 11px;
    height: 11px;
    top: -5.5px;
    left: 3.8rem;
    background-color: #f5f5f5;
    transform: rotate(45deg);
    cursor: pointer;
    transition: all .3s ease-in-out;

    ${CatePage}:hover & {
        background-color: #303030;
      }
`
const ContainerLogSign = styled.div`
    align-items: center;
    display: none;
    justify-content: center;


    @media (max-width: 768px){
    display: flex;
    }

    @media (max-width: 500px){
        flex-direction: column;
    }
`
const LoginItem = styled.div`
    display: inline-block;
    text-transform: uppercase;
    padding: .5rem 1.3rem;
    font-size: .8rem;
    background-color: ${props => props.bg};
    color: ${props => props.color};
    border: 2px solid #f5f5f5;
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



const DownNav = ({ open }) => {
    return (
        <Container open={open}>
            <Options>
                <Link href='/'>
                    <Pages>Home</Pages>
                </Link>
            </Options>
            <Options>
                <Pages>
                    <Category>
                        Categories<ArrowDropDown />
                        <DropDown>
                            <ul style={{ position: "relative" }}>
                                <LinkDropDown>
                                    <CatePage href="#">
                                        Link 1
                                        <Arrow> </Arrow>
                                    </CatePage>
                                </LinkDropDown>
                                <LinkDropDown>
                                    <CatePage href="#">Link 2</CatePage>
                                </LinkDropDown>
                                <LinkDropDown>
                                    <CatePage href="#">Link 3</CatePage>
                                </LinkDropDown>
                                <LinkDropDown>
                                    <CatePage href="#">Link 4</CatePage>
                                </LinkDropDown>
                            </ul>
                        </DropDown>
                    </Category>
                </Pages>
            </Options>
            <Options>
                <Link href='/allProducts'>
                    <Pages>
                        All Products
                    </Pages>
                </Link>
            </Options>
            <Options>
                <Link href='/aboutUs'>
                    <Pages>About us</Pages>
                </Link>
            </Options>
            <Options >
                <Link href='/contactUs'>
                    <Pages>Contact us</Pages>
                </Link>
            </Options>

            <ContainerLogSign>
                <Link href='/auth/register'>
                    <LoginItem color="#303030" bg="#f5f5f5">
                        Sign Up
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

export default DownNav

