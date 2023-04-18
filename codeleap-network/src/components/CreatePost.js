import styled from 'styled-components'

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

  div{
    width:100%;
    display: flex;
    flex-direction: column;
    /* border: 1px red solid; */
  }

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
    background: #7695EC;
    border-radius: 8px;
    border: none;
    color: #FFF;
  }
`


export const CreatePost = () => {
  return (
    <Container>
      <h2>What’s on your mind?</h2>
      <div>
        <p>Title</p>
        <input placeholder='Hello world' />
      </div>
      <div>
        <p>Content</p>
        <textarea placeholder='Content here' />
      </div>
      <button>Create</button>
    </Container>
  )
}