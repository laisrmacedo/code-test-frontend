const initialState = {
  currentUser: null,
  isModalOpen: false,
  clckedPostId: null,
  modalRequest: null
}

export const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'signup':
      return { ...state, currentUser: action.payload}
    case 'logout':
      return { ...state, currentUser: null}
    case 'modal-is-open':
      return { ...state, isModalOpen: true}
    case 'modal-is-close':
      return { ...state, isModalOpen: false}
    case 'request-data':
      return { ...state, clckedPostId: action.id, modalRequest: action.modal}
    default:
      return state
  }
}