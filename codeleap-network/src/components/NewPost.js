import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { BASE_URL } from '../utils/constants'
import { closeModal } from '../actions/actions'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  border: 1px solid #999999;
  border-radius: 16px;
  padding: 24px;
  background-color: #FFF;
  font-family: 'Roboto';

  h2{
    color: #000;
  }

  form{
    /* border: 1px red solid; */
    width:100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

  p{
    font-size: 16px;
  }
  
  input, textarea{
    min-width:100%;
    margin-top: 8px;
    padding: 8px 11px;
    border: 1px solid #777777;
    border-radius: 8px;
  }

  textarea{
    min-height: 74px;
    font-family: 'Roboto';
  }

  button{
    width: 120px;
    height: 32px;
    border-radius: 8px;
    color: #FFF;
  }

  #createBtn{
    align-self: flex-end;
    border: none;
    background: ${(props) => ((props.title.length === 0 || props.content.length === 0)? `#cfdbff`: `#7695EC`)};
    cursor: ${(props) => ((props.title.length === 0 || props.content.length === 0)? `auto`: `pointer`)};
  }

  #saveBtn{
    border: none;
    color: #FFF;
    background: ;
    background: ${(props) => ((props.title.length === 0 || props.content.length === 0)? `#b8dac0`: `#47B960`)};
    cursor: ${(props) => ((props.title.length === 0 || props.content.length === 0)? `auto`: `pointer`)};
  }

  #cancelBtn{
    border: 1px solid #999999;
    color: #000;
    cursor: pointer;
  }

  span{
    display: flex;
    gap: 16px;
    align-self: end;
  }
}
`

export const NewPost = (props) => {
  const [form, setForm] = useState({
    title: "",
    content: ""
  })

  const handleClick = (e) => {
    e.preventDefault()

    if(e.nativeEvent.submitter.id === 'createBtn'){
      createOrEditPost('post')
    }else{
      createOrEditPost('patch')
      dispatch(closeModal())
    }
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const {currentUser, clckedPostId} = useSelector((rootReducer) => rootReducer.reducer)

  const createOrEditPost = async (req) => {
    try {
      if(req === 'post'){
        await axios.post(BASE_URL, {
          username: currentUser,
          title: form.title,
          content: form.content
        })
      }else{
        await axios.patch(BASE_URL + clckedPostId + '/', {
          title: form.title,
          content: form.content
        })
      }
      setForm({
        title: "",
        content: ""
      })
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  const dispatch = useDispatch()

  return (
    <Container title={form.title} content={form.content}>
      <h2>{props.component === 'toCreate'? 'What’s on your mind?': 'Edit item'}</h2>
      <form onSubmit={handleClick}>
        <div>
          <p>Title</p>
          <input placeholder='Hello world'
            required
            type="text"
            name="title"
            value={form.title}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <p>Content</p>
          <textarea placeholder='Content here' 
            required
            type="text"
            name="content"
            value={form.content}
            onChange={onChangeForm}
          />
        </div>
        {props.component === 'toCreate'? 
          <button id="createBtn" disabled={(form.title.length === 0 || form.content.length === 0)? true : false}>Create</button>
        :
        <span>
          <button id="cancelBtn" onClick={() => dispatch(closeModal())}>Cancel</button>
          <button id="saveBtn" disabled={(form.title.length === 0 || form.content.length === 0)? true : false}>Save</button>
        </span>
        }
      </form>
    </Container>
  )
}