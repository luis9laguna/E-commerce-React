import styled from 'styled-components';
import TopNav from './navbar/TopNav';
import MiddleNav from './navbar/MiddleNav';
import Announcement from './elements/Announcement';


const Container = styled.div`
    position: sticky;
    top: 0px;
    width: 100%;
    z-index: 1000;
    background-color: #f5f5f5;
    color: #303030;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`



const Header = () => {
    return (
        <Container>
            <Announcement />
            <TopNav />
            <MiddleNav />
        </Container>
    )
}

export default Header