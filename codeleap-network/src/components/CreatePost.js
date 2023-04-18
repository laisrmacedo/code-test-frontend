import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { BASE_URL } from '../utils/constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  border: 1px solid #999999;
  border-radius: 16px;
  padding: 24px;

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
    align-self: flex-end;
    width: 111px;
    height: 32px;
    border-radius: 8px;
    border: none;
    color: #FFF;
    background: ${(props) => ((props.title.length === 0 || props.content.length === 0)? `#cfdbff`: `#7695EC`)};
    cursor: ${(props) => ((props.title.length === 0 || props.content.length === 0)? `auto`: `pointer`)};
  }
}
`

export const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    content: ""
  })

  const handleClick = (e) => {
    e.preventDefault()
    createPost()
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const {currentUser} = useSelector((rootReducer) => rootReducer.reducer)

  const body = {
    username: currentUser,
    title: form.title,
    content: form.content
  }

  const createPost = async () => {
    try {
      await axios.post(BASE_URL, body)
      setForm({
        title: "",
        content: ""
      })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <Container title={form.title} content={form.content}>
      <h2>What’s on your mind?</h2>
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
        <button disabled={(form.title.length === 0 || form.content.length === 0)? true : false}>Create</button>
      </form>
    </Container>
  )
}