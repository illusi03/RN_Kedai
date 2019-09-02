initialState = {
  isLoading: true,
  timer:0
}

export default Home = (state = initialState, action) => {
  switch (action.type) {
    //Untuk Menus Umum
    case 'SET_INTERVAL':
      return {
        ...state,
        timer: action.payload
      } 
      break
    default:
      return state
      break
  }
}