initialState = {
  dataItem: '',
  isLoading: true
}

export default Menu = (state = initialState, action) => {
  switch (action.type) {
    //Untuk Menus Umum
    case 'GET_MENU_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'GET_MENU_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        isLoading: false
      }
      break
    case 'GET_MENU_REJECTED':
      return {
        ...state,
        dataItem: null,
        isLoading: false
      }
      break

    //Untuk Category Menus
    case 'GET_CATEGORY_MENUS_PENDING':
      return {
        ...state,
        dataItem: null,
        isLoading: true
      }
      break
    case 'GET_CATEGORY_MENUS_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data.menus,
        isLoading: false
      }
      break
    case 'GET_CATEGORY_MENUS_REJECTED':
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