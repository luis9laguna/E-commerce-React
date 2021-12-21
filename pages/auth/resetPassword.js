import Layout from "../../components/public/layout/Layout";
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

const SendAgain = styled.span`
  padding-top: 1rem;
`


export default function ResetPassword() {
  return (
    <div>
      <Layout>
        <Container>
          <Title>RESET PASSWORD</Title>
          <Form>
            <Input placeholder="password"></Input>
            <Input placeholder="confirm password"></Input>
            <Button>CHANGE PASSWORD</Button>
            <SendAgain>Wait ... to send another email</SendAgain>
          </Form>
        </Container>
      </Layout>
    </div>
  )
}
