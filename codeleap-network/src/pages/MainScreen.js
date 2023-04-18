import styled from 'styled-components'
import { Body } from '../components/styledComponents'
import { CreatePost } from '../components/CreatePost'
import { Post } from '../components/Post'
import { useEffect, useState } from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import { goToSignupPage } from '../router/coordinator'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../actions/actions'
import { useSelector } from "react-redux";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  width: 80%;
  max-width: 800px;
  height: 100%;

  header{
    width: 100%;
    min-height: 80px;
    background: #7695EC;
    padding: 0 37px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p{
      font-size: 22px;
      font-weight: 700;
      color: #FFFFFF;
    }

    button{
      width: 111px;
      height: 32px;
      background: transparent;
      border-radius: 8px;
      border: 1px solid #FFF;
      color: #FFF;
      cursor: pointer;
      &:hover{
        background-color: #8facfe;
        transition: background-color 0.3s ease-in-out;
      }
    }
  }

  main{
    width: 100%;
    min-height: calc(100% - 80px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    
    .createPost{
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 350px;
    }
    
    .posts{
      display: flex;
      flex-direction: column;
      gap: 24px;
      min-height: 1500px;
      width: 100%;
    }
  }
  
  `

const PostContainer = styled.div`
  min-height: ${(props) => (props.height < 100 ? `181px` : 180+Math.floor(props.height/100)*19 + `px`)};
`

export const MainScreen = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const responde = await axios.get(BASE_URL)
      setPosts(responde.data.results)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    getPosts()
  }, [posts])

  const {currentUser} = useSelector((rootReducer) => rootReducer.reducer)

  useEffect(() => {
    if(currentUser === null){
      goToSignupPage(navigate)
    }
  }, [])
  
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
    goToSignupPage(navigate)
  }

  return (
    <Body>
      <Container>
        <header>
          <p>CodeLeap Network</p>
          <button onClick={() => logout()}>Logout</button>
        </header>
        <main>
          <div className='createPost'>
            <CreatePost></CreatePost>
          </div>
          <div className='posts'>
          {posts?.map((post)=>{
            return(
              <PostContainer key={post.id} height={post.content?.length}>
                <Post data={post}/>
              </PostContainer>
            )
          })}
          </div>
        </main>
      </Container>
    </Body>
  )
}