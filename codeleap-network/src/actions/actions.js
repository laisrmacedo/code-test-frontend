export const signupUser = (payload) => ({
  type: 'signup',
  payload
})

export const logoutUser = () => ({
  type: 'logout'
})

export const openModal = () => ({
  type: 'modal-is-open'
})

export const closeModal = () => ({
  type: 'modal-is-close'
})

export const getRequestData = (modal, id) => ({
  type: 'request-data',
  id,
  modal
})
