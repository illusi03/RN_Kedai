initialState = {
  dataItem: '',
  message: '',
  isLoading: true
}

export default Transaction = (state = initialState, action) => {
  switch (action.type) {
    //Untuk Transaction ADD 
    case 'ADD_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'ADD_TRANSACTION_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        message: action.payload.data.message,
        isLoading: false
      }
      break
    case 'ADD_TRANSACTION_REJECTED':
      return {
        ...state,
        message: action.payload.data.message,
        isLoading: false
      }
      break

    //Untuk Transaction GET 
    case 'GET_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'GET_TRANSACTION_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        message: action.payload.data.message,
        isLoading: false
      }
      break
    case 'GET_TRANSACTION_REJECTED':
      return {
        ...state,
        message: action.payload.data.message,
        isLoading: false
      }
      break
    default:
      return state
      break
  }
}