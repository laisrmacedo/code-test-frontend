import styled from 'styled-components'
import { Body } from '../components/styledComponents'
import { NewPost } from '../components/NewPost'
import { Post } from '../components/Post'
import { useEffect, useState } from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import { goToSignupPage } from '../router/coordinator'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../actions/actions'
import { useSelector } from "react-redux";
import ReactModal from 'react-modal'
import { Modal } from "../components/Modal";
import { closeModal } from "../actions/actions";
import '../utils/modal.css'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  width: 80%;
  max-width: 800px;
  height: 100%;
  position: relative;
  @media screen and (max-width: 768px){
    width: 100%;
  }

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
    position: relative;

    #topBtn{
      height: 28px;
      font-variant: all-small-caps; 
      background: #FFF;
      border: none;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
      position: absolute;
      top: 30px;
      z-index: 10;
      cursor: pointer;
      display: ${(props) => (props.display)};
    }
    
    .posts{
      display: flex;
      flex-direction: column;
      gap: 22px;
      width: 100%;
    }

    .createPost{
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 350px;
    }
    
  }
  
  `

const PostContainer = styled.li`
  min-height: ${(props) => (props.height < 100 ? `181px` : 180+Math.floor(props.height/100)*22 + `px`)};
  @media screen and (max-width: 425px){
    min-height: ${(props) => (props.height < 100 ? `181px` : 180+Math.floor(props.height/46)*22 + `px`)};
  }
`

export const MainScreen = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [currentOffset, setCurrentOffset] = useState(5)

  const getPosts = async () => {
    try {
      const response = await axios.get(BASE_URL + `?limit=${currentOffset}`)
      if(response.data.results.length === response.data.count){
        setCurrentOffset(response.data.count)
      }else{
        setPosts(response.data.results)
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if(entries.some((entry) => entry.isIntersecting)){
        setCurrentOffset((currentOffsetInsideState) => currentOffsetInsideState + 5)
      }
    })
    intersectionObserver.observe(document.querySelector('#underObservation'))
    return () => intersectionObserver.disconnect()
  }, [])

  useEffect(() => {
    getPosts()
  }, [posts])

  const {currentUser, isModalOpen} = useSelector((rootReducer) => rootReducer.reducer)

  useEffect(() => {
    if(currentUser === null){
      goToSignupPage(navigate)
    }
  }, [])
  
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(logoutUser())
    goToSignupPage(navigate)
  }

  const [displayBtn, setDisplayBtn] = useState("none")

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if(!entries.some((entry) => entry.isIntersecting)){
        setDisplayBtn('block')
      }else{
        setDisplayBtn('none')
      }
    })
    intersectionObserver.observe(document.querySelector('.createPost'))
    return () => intersectionObserver.disconnect()
  }, [])

  const scrollToTop = () => {
    window.document.querySelector('li').scrollIntoView({behavior: "smooth"})
  }


  return (
    <Body>
      <Container display={displayBtn}>
        <header>
          <p>CodeLeap Network</p>
          <button onClick={() => logout()}>Logout</button>
        </header>
        <main id='mainTag'>
          <button id='topBtn' onClick={() => scrollToTop()}>back to top</button>
          <ul className='posts'>
            <li className='createPost'>
              <NewPost component={'toCreate'}/>
            </li>
          {posts?.map((post)=>{
            return(
              <PostContainer key={post.id} height={post.content?.length}>
                <Post post={post}/>
              </PostContainer>
            )
          })}
            <li id='underObservation'></li>
          </ul>
        </main>
      </Container>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <Modal/>
      </ReactModal>
    </Body>
  )
}