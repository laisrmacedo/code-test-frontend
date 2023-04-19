import styled from 'styled-components'
import { useState } from 'react'
import { Body } from '../components/styledComponents'
import { useNavigate } from "react-router-dom";
import { goToPostsPage } from "../router/coordinator";
import { useDispatch } from "react-redux";
import { signupUser } from '../actions/actions';

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
    color: #000000;
  }
  
  div{
    width:100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
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
    border-radius: 8px;
    border: none;
    color: #FFF;
    background: ${(props) => (props.username.length === 0? `#cfdbff`: `#7695EC`)};
    cursor: ${(props) => (props.username.length === 0? `auto`: `pointer`)};
  }
`

export const Signup = () => {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const signup = () => {
    dispatch(signupUser(username))
    goToPostsPage(navigate)
  }
  
  return (
    <Body>
      <Container username={username}>
        <h2>Welcome to CodeLeap network!</h2>
        <div>
          <p>Please enter your username</p>
          <input
            placeholder="John doe"
            required
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button disabled={username.length === 0? true : false} onClick={() => signup()}>ENTER</button>
        </div>
      </Container>
    </Body>
  )
}