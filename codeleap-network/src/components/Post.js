import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  border: 1px solid #999999;
  border-radius: 16px;
  padding-bottom: 24px;


  div{
    display: flex;
    align-items: center;
    /* justify-content: center; */
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
      /* border: 1px red solid; */
    }
  }

`


export const Post = () => {
  return (
    <Container>
      <div className='title'>
        <h2>My First Post at CodeLeap Network!</h2>
        <span></span>
      </div>
      <div className='postData'>
        <span>
          <h5>@Criador</h5>
          <p>25 minutos atras</p>
        </span>
        <p>Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.

Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.</p>
      </div>
      
    </Container>
  )
}