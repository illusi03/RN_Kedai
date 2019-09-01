import axios from 'axios'
import Constanta from '../res/Constant'

export const getCategory = () => {
  return {
    type:'GET_CATEGORY',
    payload : axios.get(`${Constanta.host}/categories`)
  }
}