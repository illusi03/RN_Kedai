import axios from 'axios'
import Constanta from '../res/Constant'

export const addTransaction = (data) => {
  return {
    type: 'ADD_TRANSACTION',
    payload: axios({
      url: `${Constanta.host}/transaction`,
      method: 'POST',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
export const getTransaction = (transactionId) => {
  return {
    type: 'GET_TRANSACTION',
    payload: axios.get(`${Constanta.host}/transactionOrder/${transactionId}`)
  }
}