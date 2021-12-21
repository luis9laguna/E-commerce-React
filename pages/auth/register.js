import Layout from "../../components/public/layout/Layout";
import styled from "styled-components";


const Container = styled.div`
  padding: 20px;
  width: 40%;
  margin: 3rem auto;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`
const Title = styled.h1`
  font-size: 2rem;
  font-weight : 300;
`
const Form = styled.form`
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 1.5rem 0.8rem 0 0;
  padding: 10px;
`
const Agreement = styled.span`
  font-size: 12px;
  margin: 1.5rem 0;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 1rem 1.5rem;
  background-color: teal;
  color: white;
  cursor: pointer;
`

export default function Register() {
  return (
    <div>
      <Layout>
        <Container>
          <Title>CREATE AN ACCOUNT</Title>

          <Form>
            <Input placeholder="name"></Input>
            <Input placeholder="sur name"></Input>
            <Input placeholder="email"></Input>
            <Input placeholder="password"></Input>
            <Input placeholder="confirm password"></Input>
            <Agreement>
              By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button>Create</Button>
          </Form>
        </Container>
      </Layout>
    </div>
  )
}
