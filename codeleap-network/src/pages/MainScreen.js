import styled from 'styled-components'
import { Body } from '../components/styledComponents'
import { CreatePost } from '../components/CreatePost'
import { Post } from '../components/Post'
import { useState } from 'react'

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
    padding-left: 37px;
    display: flex;
    align-items: center;

    p{
      font-size: 22px;
      font-weight: 700;
      color: #FFFFFF;
    }
  }

  main{
    border: 1px red solid;
    overflow-y: auto;
    width: 100%;
    min-height: calc(100% - 80px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    /* position: relative; */

    .createPost{
      display: flex;
      flex-direction: column;
      width: 100%;
      /* position: sticky;
      top: 0; */
      /* height: 350px; */
      min-height: 350px;
    /* align-items: center; */
    }

    .posts{
      >div{
      height: 400px;

      }
    }
  }

`

export const MainScreen = () => {

  const [posts, setPosts] = useState([])

  const getPosts = async (path, headers) => {
    try {
      // const responde = await axios.get(BASE_URL + path, headers)
      // setPosts(responde.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <Body>
      <Container>
        <header>
          <p>CodeLeap Network</p>
        </header>
        <main>
          <div className='createPost'>
            <CreatePost></CreatePost>
          </div>
          <div className='posts'>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          </div>
        </main>
      </Container>
    </Body>
  )
}