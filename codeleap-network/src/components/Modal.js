import styled from "styled-components"
import '../utils/modal.css'
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../actions/actions"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { NewPost } from "./NewPost"

  const DeleteModal = styled.div`
    background-color: #FFF;
    text-align: center;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #999999;
    height: 146px;
    max-width: 660px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    span{
      display: flex;
      gap: 16px;
      align-self: end;
    }
    
  `

const EditModal = styled.div`

`


export const Modal = () => {
  const {clckedPostId, modalRequest} = useSelector((rootReducer) => rootReducer.reducer)

  const request = async (req, id) => {
    try {
      if(req === 'delete'){
        await axios.delete(BASE_URL + id + '/')
      }else{
        // await axios.delete(BASE_URL + id + '/', {title: })
      }
      dispatch(closeModal())
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  const dispatch = useDispatch()
  
  return(
    <>
        {modalRequest === 'delete'? 
        <DeleteModal>
          <h2>Are you sure you want to delete this item?</h2>
          <span>
            <button className="cancelBtn" onClick={() => dispatch(closeModal())}>Cancel</button>
            <button className="deleteBtn" onClick={() => request('delete', clckedPostId)}>Delete</button>
          </span>
        </DeleteModal>
        :
        <EditModal>
          <NewPost component={'toEdit'}/>
        </EditModal>
        }
    </>
  )
}