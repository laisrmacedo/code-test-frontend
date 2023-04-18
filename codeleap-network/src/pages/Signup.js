import styled from 'styled-components'
// import codeleap from '../assets/codeleap_logo.png'
import { useState } from 'react'
import { Body } from '../components/styledComponents'

const Container = styled.main`
  padding: 24px;
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 32%;
  min-width: 300px;
  max-width: 500px;

  h2{
    font-size: 22px;
  }

  div{
    width:100%;
    display: flex;
    flex-direction: column;
  }

  p{
    font-size: 16px;
  }
  
  input{
    width:100%;
    margin-top: 8px;
    padding: 8px 11px;
    border: 1px solid #777777;
    border-radius: 8px;
  }

  button{
    margin-top: 16px;
    align-self: flex-end;
    width: 111px;
    height: 32px;
    background: #7695EC;
    border-radius: 8px;
    border: none;
    color: #FFF;
  }
`

export const Signup = () => {
  // const [isLoading, setIsLoading] = useState(false)

  return (
    <Body>
      <Container>
        <h2>Welcome to CodeLeap network!</h2>
        <div>
          <p>Please enter your username</p>
          <input placeholder='John doe' />
          <button>ENTER</button>
        </div>
      </Container>
    </Body>
  )
}