import styled from 'styled-components'

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
  }

  .postData{
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    span{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`

export const Post = (props) => {
  return (
    <Container>
      <div className='title'>
        <h2>{props.data.title}</h2>
        <span></span>
      </div>
      <div className='postData'>
        <span>
          <h5>@{props.data.username}</h5>
          <p>{props.data.created_datetime}</p>
        </span>
        <p>{props.data.content}</p>
      </div>
    </Container>
  )
}