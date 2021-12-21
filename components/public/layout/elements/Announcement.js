import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: #303030;
    color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;


    @media (max-width: 350px){
        font-size: 0.8rem;
        
    }
`


const Announcement = () => {
    return (
        <Container>
            BIG NEWS!!! Free shipping on Orders Over $50!
        </Container>
    )
}

export default Announcement