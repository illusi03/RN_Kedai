initialState = {
  dataItem: '',
  isLoading: true
}

export default Category = (state = initialState, action) => {
  switch (action.type) {
    //Untuk Category Master 
    case 'GET_CATEGORY_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'GET_CATEGORY_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        isLoading: false
      }
      break
    case 'GET_CATEGORY_REJECTED':
      return {
        ...state,
        dataItem: null,
        isLoading: false
      }
      break
    default:
      return state
      break
  }
}