import styled from 'styled-components'
import deleteImage from '../assets/delete.png'
import penImage from '../assets/edit-pen.png'
import boxImage from '../assets/edit-box.png'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, getRequestData } from '../actions/actions'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  border: 1px solid #999999;
  border-radius: 16px;
  padding-bottom: 24px;
  max-width: calc(800px - 24px - 24px);

  div{
    display: flex;
    align-items: center;
  }
  
  .title{
    width: 100%;
    padding: 0 24px;
    background: #7695EC;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
      display: ${(props) => (props.showDiv? 'flex' : 'none')};
      gap: 34px;
    }
    span{
      margin-top: 4px; 
      position: relative;
    }
    .pen{
      position: absolute;
      right: 0;
    }
  }

  .postData{
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    >p{
      width: 100%;
    }
    
    span{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`

export const Post = (props) => {
  const {currentUser} = useSelector((rootReducer) => rootReducer.reducer)
  const dispatch = useDispatch()
  
  const modalToRequest = async (modal, id) => {
    dispatch(openModal())
    dispatch(getRequestData(modal, id))
  }

  return (
    <Container showDiv={props.post.username === currentUser? true : false}>
      <div className='title'>
        <h2>{props.post.title}</h2>
        <div>
          <img src={deleteImage} onClick={() => modalToRequest('delete', props.post.id)}/>
          <span onClick={() => modalToRequest('patch', props.post.id)}>
            <img className='pen' src={penImage}/>
            <img src={boxImage}/>
          </span>
        </div>
      </div>
      <div className='postData'>
        <span>
          <h5>@{props.post.username}</h5>
          <p>{props.post.created_datetime}</p>
        </span>
        <p>{props.post.content}</p>
      </div>
    </Container>
  )
}