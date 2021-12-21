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
const Label = styled.label`
  margin-top: 1rem;
  font-size: 1.3rem;
`

const Text = styled.textarea`
  width: 25rem;
  height: 10rem;
`

const Button = styled.button`
  width: 40%;
  margin-top: 2rem;
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

export default function ContactUs() {
  return (
    <div>
      <Layout>
        <Container>
          <Title>CONTACT</Title>
          <Form>
            <Input placeholder="name"></Input>
            <Input placeholder="email"></Input>
            <Label for="text">Message</Label>
            <Text name="text"> </Text>
            <Button>SEND</Button>
          </Form>
        </Container>
      </Layout>
    </div>
  )
}
