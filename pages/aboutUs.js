import Layout from "../components/public/layout/Layout";
import styled from "styled-components";

const Container = styled.div`
padding: 20px;
  width: 35%;
  margin: 3rem auto;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight : 300;
`

const Information = styled.p`

`

export default function Home() {
  return (
    <div>
      <Layout>
        <Container>
          <Title>OUR MISSION</Title>
          <Information>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </Information>
        </Container>
      </Layout>
    </div>
  )
}
