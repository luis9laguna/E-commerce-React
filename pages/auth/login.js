import Layout from "../../components/public/layout/Layout";
import styled from "styled-components";
import Link from "next/link";


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
const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Input = styled.input`
  flex: 1;
  min-width: 70%;
  margin: 0.8rem 0rem;
  padding: 1rem;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 1rem 1.5rem;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const Pages = styled.div`
  margin: .4rem 0;
  font-size: .8rem;
  text-decoration: underline;
  cursor: pointer
`

export default function Login() {
  return (
    <div>
      <Layout>
        <Container>
          <Title>SIGN IN </Title>
          <Form>
            <Input placeholder="email"></Input>
            <Input placeholder="password"></Input>
            <Button>LOGIN</Button>
            <Pages>
              <Link href="/auth/forgotPassword">DONT REMEMBER THE PASSWORD?</Link>
            </Pages>
            <Pages>
              <Link href="/auth/register">CREATE A NEW ACCOUNT</Link>
            </Pages>
          </Form>
        </Container>
      </Layout>
    </div>
  )
}
