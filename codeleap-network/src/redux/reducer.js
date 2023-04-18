const initialUser = {
  currentUser: null
}

export const reducer = (state = initialUser, action) => {

  switch (action.type) {
    case 'signup':
      return { ...state, currentUser: action.payload}
    case 'logout':
      return { ...state, currentUser: null}
    default:
      return state
  }

}