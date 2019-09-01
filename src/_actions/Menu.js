import axios from 'axios'
import Constanta from '../res/Constant'

export const getMenu = () => {
  return {
    type:'GET_MENU',
    payload : axios.get(`${Constanta.host}/menus`)
  }
}
export const getMenuWhereCategory = (categoryId) => {
  return {
    type:'GET_CATEGORY_MENUS',
    payload : axios.get(`${Constanta.host}/category/menus/${categoryId}`)
  }
}